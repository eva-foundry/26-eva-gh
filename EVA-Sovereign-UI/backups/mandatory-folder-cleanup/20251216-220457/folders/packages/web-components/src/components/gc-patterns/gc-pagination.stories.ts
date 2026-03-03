import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-pagination';

const meta: Meta = {
  title: 'GC Patterns/gc-pagination',
  component: 'gc-pagination',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-pagination
      currentPage="1"
      totalPages="10"
    ></gc-pagination>
  `
};

export const WithInfo: Story = {
  render: () => html`
    <gc-pagination
      currentPage="1"
      totalPages="10"
      showInfo
      totalItems="100"
      itemsPerPage="10"
    ></gc-pagination>
  `
};

export const FewPages: Story = {
  render: () => html`
    <gc-pagination
      currentPage="2"
      totalPages="5"
    ></gc-pagination>
  `
};

export const ManyPages: Story = {
  render: () => html`
    <gc-pagination
      currentPage="10"
      totalPages="50"
    ></gc-pagination>
  `
};

export const FirstPage: Story = {
  render: () => html`
    <gc-pagination
      currentPage="1"
      totalPages="20"
      showInfo
      totalItems="200"
      itemsPerPage="10"
    ></gc-pagination>
  `
};

export const LastPage: Story = {
  render: () => html`
    <gc-pagination
      currentPage="20"
      totalPages="20"
      showInfo
      totalItems="200"
      itemsPerPage="10"
    ></gc-pagination>
  `
};

export const MiddlePage: Story = {
  render: () => html`
    <gc-pagination
      currentPage="15"
      totalPages="30"
      showInfo
      totalItems="300"
      itemsPerPage="10"
    ></gc-pagination>
  `
};

export const SinglePage: Story = {
  render: () => html`
    <gc-pagination
      currentPage="1"
      totalPages="1"
    ></gc-pagination>
  `
};

export const CustomMaxVisible: Story = {
  render: () => html`
    <gc-pagination
      currentPage="10"
      totalPages="50"
      maxVisible="5"
    ></gc-pagination>
  `
};

export const WithEvents: Story = {
  render: () => {
    const handlePageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Page changed:', customEvent.detail);
    };

    return html`
      <div>
        <p>Open browser console to see events when clicking pagination buttons.</p>
        <gc-pagination
          currentPage="5"
          totalPages="20"
          showInfo
          totalItems="200"
          itemsPerPage="10"
          @gc-page-change="${handlePageChange}"
        ></gc-pagination>
      </div>
    `;
  }
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-pagination
      locale="fr-CA"
      currentPage="3"
      totalPages="15"
      showInfo
      totalItems="150"
      itemsPerPage="10"
    ></gc-pagination>
  `
};

export const DataTable: Story = {
  render: () => {
    let currentPage = 1;
    const totalItems = 247;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      currentPage = customEvent.detail.page;
      console.log('Viewing page:', currentPage);
    };

    const getPageData = () => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = Math.min(start + itemsPerPage, totalItems);
      return Array.from({ length: end - start }, (_, i) => ({
        id: start + i + 1,
        name: `Item ${start + i + 1}`,
        status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive'
      }));
    };

    return html`
      <div>
        <h3>Data Table with Pagination</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
          <thead>
            <tr style="background: #f5f5f5; border-bottom: 2px solid #ddd;">
              <th style="padding: 0.75rem; text-align: left;">ID</th>
              <th style="padding: 0.75rem; text-align: left;">Name</th>
              <th style="padding: 0.75rem; text-align: left;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${getPageData().map(item => html`
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 0.75rem;">${item.id}</td>
                <td style="padding: 0.75rem;">${item.name}</td>
                <td style="padding: 0.75rem;">${item.status}</td>
              </tr>
            `)}
          </tbody>
        </table>
        
        <gc-pagination
          currentPage="${currentPage}"
          totalPages="${totalPages}"
          showInfo
          totalItems="${totalItems}"
          itemsPerPage="${itemsPerPage}"
          @gc-page-change="${handlePageChange}"
        ></gc-pagination>
      </div>
    `;
  }
};

export const SearchResults: Story = {
  render: () => html`
    <div>
      <h3>Search Results</h3>
      <p style="margin-bottom: 1rem; color: #666;">Found 156 results for "government services"</p>
      
      <div style="margin-bottom: 2rem;">
        ${Array.from({ length: 10 }, (_, i) => html`
          <div style="padding: 1rem; border-bottom: 1px solid #ddd;">
            <h4 style="margin: 0 0 0.5rem 0; color: #26374a;">
              <a href="#" style="text-decoration: none; color: #26374a;">
                Result ${i + 1}: Government Service
              </a>
            </h4>
            <p style="margin: 0; color: #666; font-size: 0.875rem;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" style="color: #269abc; font-size: 0.875rem;">canada.ca/service-${i + 1}</a>
          </div>
        `)}
      </div>
      
      <gc-pagination
        currentPage="1"
        totalPages="16"
        showInfo
        totalItems="156"
        itemsPerPage="10"
      ></gc-pagination>
    </div>
  `
};

export const BlogPosts: Story = {
  render: () => html`
    <div>
      <h3>Blog Posts</h3>
      
      <div style="margin-bottom: 2rem;">
        ${Array.from({ length: 5 }, (_, i) => html`
          <article style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 2px solid #ddd;">
            <h4 style="margin: 0 0 0.5rem 0;">
              <a href="#" style="text-decoration: none; color: #26374a;">
                Blog Post Title ${i + 1}
              </a>
            </h4>
            <p style="margin: 0 0 1rem 0; color: #999; font-size: 0.875rem;">
              Posted on December ${i + 1}, 2025 by John Doe
            </p>
            <p style="margin: 0; line-height: 1.6;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <a href="#" style="color: #269abc; margin-top: 0.5rem; display: inline-block;">
              Read more →
            </a>
          </article>
        `)}
      </div>
      
      <gc-pagination
        currentPage="2"
        totalPages="12"
        showInfo
        totalItems="60"
        itemsPerPage="5"
      ></gc-pagination>
    </div>
  `
};

export const ProductCatalog: Story = {
  render: () => html`
    <div>
      <h3>Product Catalog</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        ${Array.from({ length: 12 }, (_, i) => html`
          <div style="border: 1px solid #ddd; border-radius: 4px; padding: 1rem;">
            <div style="width: 100%; height: 150px; background: #f5f5f5; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; color: #999;">
              Product ${i + 1}
            </div>
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem;">Product Name</h4>
            <p style="margin: 0 0 0.5rem 0; color: #666; font-size: 0.875rem;">Short description</p>
            <p style="margin: 0; font-weight: 700; color: #26374a;">$29.99</p>
          </div>
        `)}
      </div>
      
      <gc-pagination
        currentPage="3"
        totalPages="25"
        showInfo
        totalItems="300"
        itemsPerPage="12"
      ></gc-pagination>
    </div>
  `
};
