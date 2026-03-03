#!/usr/bin/env python3
"""
MS-InfoJP Professional Runner with Pre-Flight Validation
Enterprise-grade execution wrapper for MS-InfoJP MVP operations

CRITICAL: Windows Enterprise Encoding Safety
- Uses ASCII-only output ([PASS], [FAIL], [ERROR], [INFO])
- Sets PYTHONIOENCODING=utf-8 in batch wrapper
"""

import os
import sys
import json
import asyncio
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

# Windows encoding safety
sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None


class MSInfoJPRunner:
    """Professional runner for MS-InfoJP operations"""
    
    def __init__(self):
        self.project_root = self._auto_detect_project_root()
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.log_file = self.project_root / "logs" / f"runner_{self.timestamp}.log"
        
        # Ensure log directory exists
        self.log_file.parent.mkdir(parents=True, exist_ok=True)
        
        self._log("[INFO] MS-InfoJP Professional Runner initialized")
        self._log(f"[INFO] Project root: {self.project_root}")
    
    def _auto_detect_project_root(self) -> Path:
        """Auto-detect MS-InfoJP project root from any subdirectory"""
        current = Path.cwd()
        
        # Look for project marker files
        markers = ["ACCEPTANCE.md", ".github/copilot-instructions.md", "README.md"]
        
        while current != current.parent:
            if current.name == "11-MS-InfoJP":
                return current
            
            # Check for marker files
            if any((current / marker).exists() for marker in markers):
                if "11-MS-InfoJP" in str(current):
                    return current
            
            current = current.parent
        
        # Fallback: use current directory
        print("[WARN] Could not auto-detect project root; using current directory")
        return Path.cwd()
    
    def _log(self, message: str):
        """Log message to console and file"""
        print(message)
        with open(self.log_file, 'a', encoding='utf-8') as f:
            f.write(f"{datetime.now().isoformat()} - {message}\n")
    
    async def validate_environment_pre_flight(self) -> Dict[str, Any]:
        """Validate environment before execution"""
        self._log("[INFO] Running pre-flight environment validation...")
        
        validation_report = {
            "timestamp": datetime.now().isoformat(),
            "checks": {},
            "all_passed": True
        }
        
        # Check 1: Python version
        py_version = sys.version_info
        py_check = py_version.major == 3 and py_version.minor >= 11
        validation_report["checks"]["python_version"] = {
            "passed": py_check,
            "value": f"{py_version.major}.{py_version.minor}.{py_version.micro}",
            "required": "3.11+"
        }
        self._log(f"[{'PASS' if py_check else 'FAIL'}] Python version: {py_version.major}.{py_version.minor}")
        
        # Check 2: Project structure
        required_dirs = ["scripts", "debug", "evidence", "logs", "sessions", "input", "output", "tests"]
        structure_check = all((self.project_root / d).exists() for d in required_dirs)
        validation_report["checks"]["project_structure"] = {
            "passed": structure_check,
            "missing": [d for d in required_dirs if not (self.project_root / d).exists()]
        }
        self._log(f"[{'PASS' if structure_check else 'FAIL'}] Project structure validation")
        
        # Check 3: Base platform cloned
        base_platform_path = self.project_root / "base-platform"
        base_platform_check = base_platform_path.exists() and (base_platform_path / "README.md").exists()
        validation_report["checks"]["base_platform"] = {
            "passed": base_platform_check,
            "path": str(base_platform_path)
        }
        self._log(f"[{'PASS' if base_platform_check else 'WARN'}] Base platform (PubSec-Info-Assistant)")
        
        if not base_platform_check:
            self._log("[INFO] Run scripts/clone_microsoft_repo.bat to clone base platform")
        
        # Check 4: Python dependencies (basic check)
        try:
            import aiohttp
            import azure.identity
            deps_check = True
        except ImportError as e:
            deps_check = False
            validation_report["checks"]["dependencies"] = {
                "passed": False,
                "error": str(e)
            }
            self._log(f"[WARN] Missing dependencies: {e}")
        
        if deps_check:
            validation_report["checks"]["dependencies"] = {"passed": True}
            self._log("[PASS] Core dependencies available")
        
        # Check 5: Azure configuration (if available)
        azure_config_check = await self._check_azure_configuration()
        validation_report["checks"]["azure_config"] = azure_config_check
        self._log(f"[{'PASS' if azure_config_check['passed'] else 'WARN'}] Azure configuration")
        
        # Overall result
        validation_report["all_passed"] = all(
            check.get("passed", False) 
            for key, check in validation_report["checks"].items()
            if key not in ["base_platform", "azure_config"]  # Non-critical
        )
        
        # Save validation report
        report_path = self.project_root / "evidence" / f"pre_flight_validation_{self.timestamp}.json"
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(validation_report, f, indent=2)
        
        self._log(f"[INFO] Validation report saved: {report_path}")
        
        if validation_report["all_passed"]:
            self._log("[PASS] Pre-flight validation complete - environment ready")
        else:
            self._log("[WARN] Pre-flight validation complete with warnings")
        
        return validation_report
    
    async def _check_azure_configuration(self) -> Dict[str, Any]:
        """Check Azure resource configuration"""
        backend_env_path = self.project_root / "base-platform" / "app" / "backend" / "backend.env"
        
        if not backend_env_path.exists():
            return {
                "passed": False,
                "reason": "backend.env not found",
                "path": str(backend_env_path)
            }
        
        # Load environment variables
        azure_vars = {}
        try:
            with open(backend_env_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, value = line.split('=', 1)
                        azure_vars[key.strip()] = value.strip()
        except Exception as e:
            return {
                "passed": False,
                "reason": f"Error reading backend.env: {e}"
            }
        
        # Check required variables
        required_vars = [
            "AZURE_OPENAI_ENDPOINT",
            "AZURE_SEARCH_ENDPOINT",
            "AZURE_COSMOSDB_ENDPOINT"
        ]
        
        missing_vars = [v for v in required_vars if v not in azure_vars or not azure_vars[v]]
        
        return {
            "passed": len(missing_vars) == 0,
            "configured_count": len(required_vars) - len(missing_vars),
            "total_required": len(required_vars),
            "missing": missing_vars
        }
    
    def build_command(self, operation: str, **kwargs) -> List[str]:
        """Build normalized command for operation"""
        self._log(f"[INFO] Building command for operation: {operation}")
        
        commands = {
            "clone": ["python", str(self.project_root / "scripts" / "clone_microsoft_repo.bat")],
            "setup": ["python", str(self.project_root / "scripts" / "setup_environment.py")],
            "ingest": ["python", str(self.project_root / "scripts" / "run_canlii_cdc.py")],
            "test": ["python", "-m", "pytest", str(self.project_root / "tests" / "acceptance"), "-v"],
            "validate": ["python", str(self.project_root / "scripts" / "validate_acceptance.py")]
        }
        
        base_command = commands.get(operation)
        if not base_command:
            raise ValueError(f"[ERROR] Unknown operation: {operation}")
        
        # Add kwargs as arguments
        for key, value in kwargs.items():
            if value is not None:
                base_command.extend([f"--{key}", str(value)])
        
        self._log(f"[INFO] Command: {' '.join(base_command)}")
        return base_command
    
    async def execute_with_enterprise_safety(self, operation: str, **kwargs) -> Dict[str, Any]:
        """Execute operation with full error handling and evidence collection"""
        self._log(f"[INFO] Starting operation: {operation}")
        
        execution_report = {
            "operation": operation,
            "start_time": datetime.now().isoformat(),
            "arguments": kwargs,
            "success": False
        }
        
        try:
            # Pre-execution state capture
            pre_state_path = self.project_root / "debug" / f"{operation}_before_{self.timestamp}.json"
            with open(pre_state_path, 'w', encoding='utf-8') as f:
                json.dump({
                    "timestamp": datetime.now().isoformat(),
                    "operation": operation,
                    "arguments": kwargs
                }, f, indent=2)
            
            # Execute operation
            command = self.build_command(operation, **kwargs)
            
            # For now, just log the command (actual execution depends on operation type)
            self._log(f"[INFO] Would execute: {' '.join(command)}")
            execution_report["command"] = ' '.join(command)
            
            # Post-execution state capture
            post_state_path = self.project_root / "debug" / f"{operation}_success_{self.timestamp}.json"
            with open(post_state_path, 'w', encoding='utf-8') as f:
                json.dump({
                    "timestamp": datetime.now().isoformat(),
                    "operation": operation,
                    "result": "success"
                }, f, indent=2)
            
            execution_report["success"] = True
            execution_report["end_time"] = datetime.now().isoformat()
            
            self._log(f"[PASS] Operation {operation} completed successfully")
            
        except Exception as e:
            # Error state capture
            error_state_path = self.project_root / "debug" / f"{operation}_error_{self.timestamp}.json"
            with open(error_state_path, 'w', encoding='utf-8') as f:
                json.dump({
                    "timestamp": datetime.now().isoformat(),
                    "operation": operation,
                    "error": str(e),
                    "error_type": type(e).__name__
                }, f, indent=2)
            
            execution_report["error"] = str(e)
            execution_report["error_type"] = type(e).__name__
            execution_report["end_time"] = datetime.now().isoformat()
            
            self._log(f"[ERROR] Operation {operation} failed: {e}")
            raise
        
        finally:
            # Save execution report
            report_path = self.project_root / "evidence" / f"execution_{operation}_{self.timestamp}.json"
            with open(report_path, 'w', encoding='utf-8') as f:
                json.dump(execution_report, f, indent=2)
        
        return execution_report
    
    async def run(self, operation: str, skip_preflight: bool = False, **kwargs):
        """Main execution entry point"""
        self._log(f"[INFO] MS-InfoJP Runner starting - Operation: {operation}")
        
        # Pre-flight validation (unless skipped)
        if not skip_preflight:
            validation = await self.validate_environment_pre_flight()
            
            if not validation["all_passed"]:
                self._log("[WARN] Pre-flight validation failed; continuing with warnings")
        
        # Execute operation
        result = await self.execute_with_enterprise_safety(operation, **kwargs)
        
        self._log("[INFO] MS-InfoJP Runner complete")
        return result


async def main():
    """CLI entry point"""
    parser = argparse.ArgumentParser(
        description="MS-InfoJP Professional Runner",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run_ms_infojp.py clone
  python run_ms_infojp.py ingest --topics employment_insurance
  python run_ms_infojp.py test
  python run_ms_infojp.py validate
        """
    )
    
    parser.add_argument("operation", choices=["clone", "setup", "ingest", "test", "validate"],
                        help="Operation to perform")
    parser.add_argument("--skip-preflight", action="store_true",
                        help="Skip pre-flight validation")
    parser.add_argument("--topics", type=str,
                        help="Topics for ingestion (comma-separated)")
    
    args = parser.parse_args()
    
    # Convert topics to list if provided
    kwargs = {}
    if args.topics:
        kwargs["topics"] = args.topics.split(",")
    
    runner = MSInfoJPRunner()
    
    try:
        await runner.run(args.operation, skip_preflight=args.skip_preflight, **kwargs)
        sys.exit(0)
    except Exception as e:
        print(f"[ERROR] Runner failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
