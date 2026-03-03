import { cn } from '@/lib/utils';
import { useState, useRef } from 'react';
import { UploadSimple, File, X } from '@phosphor-icons/react';
import { GCButton } from './GCButton';

interface GCFileUploaderProps {
  id: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  onChange?: (files: File[]) => void;
}

export function GCFileUploader({
  id,
  label,
  accept,
  multiple = false,
  maxSize = 10485760,
  required,
  helperText,
  error,
  className,
  onChange
}: GCFileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    
    const fileArray = Array.from(newFiles).filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} exceeds maximum size of ${maxSize / 1048576}MB`);
        return false;
      }
      return true;
    });

    const updatedFiles = multiple ? [...files, ...fileArray] : fileArray;
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="block text-base font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}

      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          dragActive ? 'border-primary bg-primary/5' : 'border-border',
          error && 'border-destructive'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />
        
        <UploadSimple size={48} className="mx-auto text-muted-foreground mb-3" />
        
        <p className="text-base text-foreground mb-2">
          Drag and drop files here, or
        </p>
        
        <GCButton
          variant="secondary"
          size="small"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          Choose files
        </GCButton>
        
        <p className="text-sm text-muted-foreground mt-3">
          Maximum file size: {maxSize / 1048576}MB
        </p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2 mt-3">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded border border-border"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <File size={20} className="text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 p-1 hover:bg-destructive/10 rounded transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <X size={20} className="text-destructive" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}
