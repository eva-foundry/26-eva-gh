import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

/**
 * WB-Charts - Charts and Graphs
 * Data visualization with bar, line, pie, donut charts
 */
@customElement('wb-charts')
export class WBCharts extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .chart-container {
      position: relative;
      width: 100%;
      height: 400px;
    }

    canvas {
      max-width: 100%;
      max-height: 100%;
    }

    .chart-legend {
      display: flex;
      flex-wrap: wrap;
      gap: var(--eva-spacing-sm, 0.5rem);
      margin-top: var(--eva-spacing-md, 1rem);
      justify-content: center;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: var(--eva-spacing-xs, 0.25rem);
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border-radius: var(--eva-border-radius-sm, 3px);
      cursor: pointer;
      user-select: none;
    }

    .legend-item:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .legend-item.disabled {
      opacity: 0.5;
    }

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 2px;
    }

    .chart-table {
      margin-top: var(--eva-spacing-md, 1rem);
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--eva-colors-border-default, #cccccc);
    }

    .chart-table th,
    .chart-table td {
      padding: var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      text-align: left;
    }

    .chart-table th {
      background: var(--eva-colors-background-secondary, #f5f5f5);
      font-weight: bold;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `;

  @property({ type: String })
  type: 'bar' | 'line' | 'pie' | 'donut' = 'bar';

  @property({ type: Object })
  data: ChartData = { labels: [], datasets: [] };

  @property({ type: String })
  title = '';

  @property({ type: Boolean, attribute: 'show-legend' })
  showLegend = true;

  @property({ type: Boolean, attribute: 'show-table' })
  showTable = false;

  @state()
  private hiddenDatasets: Set<number> = new Set();

  private canvasRef: HTMLCanvasElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-charts', {
      'en-CA': {
        dataTable: 'Data Table',
        toggleSeries: 'Toggle data series',
        chartTitle: 'Chart'
      },
      'fr-CA': {
        dataTable: 'Tableau de données',
        toggleSeries: 'Basculer la série de données',
        chartTitle: 'Graphique'
      }
    });
  }

  override firstUpdated(): void {
    this.renderChart();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('data') || changedProperties.has('type')) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (!this.canvasRef) return;

    const ctx = this.canvasRef.getContext('2d');
    if (!ctx) return;

    // Simple canvas-based chart rendering (simplified version)
    const visibleDatasets = this.data.datasets.filter((_, i) => !this.hiddenDatasets.has(i));
    
    ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    
    if (this.type === 'bar') {
      this.drawBarChart(ctx, visibleDatasets);
    } else if (this.type === 'line') {
      this.drawLineChart(ctx, visibleDatasets);
    } else if (this.type === 'pie' || this.type === 'donut') {
      this.drawPieChart(ctx, visibleDatasets);
    }
  }

  private drawBarChart(ctx: CanvasRenderingContext2D, datasets: ChartDataset[]): void {
    const width = this.canvasRef!.width;
    const height = this.canvasRef!.height;
    const padding = 40;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;
    
    const maxValue = Math.max(...datasets.flatMap(d => d.data));
    const barWidth = chartWidth / (this.data.labels.length * datasets.length + this.data.labels.length);
    
    datasets.forEach((dataset, datasetIndex) => {
      dataset.data.forEach((value, index) => {
        const x = padding + index * (barWidth * datasets.length + barWidth) + datasetIndex * barWidth;
        const barHeight = (value / maxValue) * chartHeight;
        const y = height - padding - barHeight;
        
        ctx.fillStyle = Array.isArray(dataset.backgroundColor) ? 
          dataset.backgroundColor[index] || '#335075' : 
          dataset.backgroundColor || '#335075';
        ctx.fillRect(x, y, barWidth * 0.8, barHeight);
      });
    });
  }

  private drawLineChart(ctx: CanvasRenderingContext2D, datasets: ChartDataset[]): void {
    const width = this.canvasRef!.width;
    const height = this.canvasRef!.height;
    const padding = 40;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;
    
    const maxValue = Math.max(...datasets.flatMap(d => d.data));
    const pointSpacing = chartWidth / (this.data.labels.length - 1);
    
    datasets.forEach((dataset) => {
      ctx.strokeStyle = dataset.borderColor || '#335075';
      ctx.lineWidth = dataset.borderWidth || 2;
      ctx.beginPath();
      
      dataset.data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = height - padding - (value / maxValue) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    });
  }

  private drawPieChart(ctx: CanvasRenderingContext2D, datasets: ChartDataset[]): void {
    const width = this.canvasRef!.width;
    const height = this.canvasRef!.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    if (datasets.length === 0) return;
    
    const data = datasets[0].data;
    const total = data.reduce((sum, val) => sum + val, 0);
    const colors = Array.isArray(datasets[0].backgroundColor) ? 
      datasets[0].backgroundColor : 
      ['#335075', '#26374a', '#1f2d3d', '#163145', '#0d2b3e'];
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      
      currentAngle += sliceAngle;
    });
    
    // Donut hole
    if (this.type === 'donut') {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  private toggleDataset(index: number): void {
    if (this.hiddenDatasets.has(index)) {
      this.hiddenDatasets.delete(index);
    } else {
      this.hiddenDatasets.add(index);
    }
    this.hiddenDatasets = new Set(this.hiddenDatasets);
    this.renderChart();
    this.emitEvent('wb-chart-toggle', { datasetIndex: index, hidden: this.hiddenDatasets.has(index) });
  }

  override render() {
    return html`
      <div class="chart-container" role="img" aria-label="${this.title || this.getMessage('wb-charts', 'chartTitle')}">
        <canvas
          width="800"
          height="400"
          ${(ref: Element) => { this.canvasRef = ref as HTMLCanvasElement; }}
        ></canvas>
        <div class="visually-hidden">${this.getMessage('wb-charts', 'dataTable')}</div>
      </div>

      ${this.showLegend ? html`
        <div class="chart-legend" role="list">
          ${this.data.datasets.map((dataset, index) => html`
            <div
              class="legend-item ${this.hiddenDatasets.has(index) ? 'disabled' : ''}"
              role="listitem"
              tabindex="0"
              @click="${() => this.toggleDataset(index)}"
              @keydown="${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.toggleDataset(index);
                }
              }}"
              aria-label="${this.getMessage('wb-charts', 'toggleSeries')} ${dataset.label}"
            >
              <span
                class="legend-color"
                style="background-color: ${Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : dataset.backgroundColor || '#335075'}"
              ></span>
              <span>${dataset.label}</span>
            </div>
          `)}
        </div>
      ` : ''}

      ${this.showTable ? html`
        <table class="chart-table" role="table">
          <caption>${this.getMessage('wb-charts', 'dataTable')}</caption>
          <thead>
            <tr>
              <th></th>
              ${this.data.labels.map(label => html`<th>${label}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${this.data.datasets.map(dataset => html`
              <tr>
                <th>${dataset.label}</th>
                ${dataset.data.map(value => html`<td>${value}</td>`)}
              </tr>
            `)}
          </tbody>
        </table>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-charts': WBCharts;
  }
}
