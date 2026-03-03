import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GCButton,
  GCBadge,
  GCAlert,
  GCInput,
  GCTextarea,
  GCCheckbox,
  GCRadio,
  GCSelect,
  GCProgressBar,
  GCTabs,
  GCAccordion,
  GCTable,
  GCPagination,
  GCBreadcrumb,
  GCContainer,
  GCDateInput,
  GCDateModified,
  GCDetails,
  GCErrorMessage,
  GCErrorSummary,
  GCFieldset,
  GCFileUploader,
  GCFooter,
  GCGrid,
  GCGridItem,
  GCHeader,
  GCHeading,
  GCIcon,
  GCLanguageToggle,
  GCLink,
  GCNotice,
  GCSearch,
  GCScreenReaderOnly,
  GCSideNavigation,
  GCSignature,
  GCStepper,
  GCText,
  GCThemeTopicMenu,
  GCTopNavigation
} from '@/components/gc';
import { CheckCircle, Copy, House, Buildings, User } from '@phosphor-icons/react';
import { toast } from 'sonner';

export function GCComponentsShowcase() {
  const [currentTab, setCurrentTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div>
        <GCHeading level={1}>GC Design System Components</GCHeading>
        <GCText variant="lead" className="mt-4">
          Complete component library following Government of Canada design standards
        </GCText>
        <div className="mt-4">
          <GCBadge variant="success">✓ All 32 components implemented</GCBadge>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
          <TabsTrigger value="forms" className="py-3">Forms</TabsTrigger>
          <TabsTrigger value="navigation" className="py-3">Navigation</TabsTrigger>
          <TabsTrigger value="layout" className="py-3">Layout</TabsTrigger>
          <TabsTrigger value="advanced" className="py-3">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete Component Library</CardTitle>
              <CardDescription>All GC Design System components organized by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <GCHeading level={3}>Buttons & Actions</GCHeading>
                <div className="mt-4 flex flex-wrap gap-3">
                  <GCButton variant="primary">Primary</GCButton>
                  <GCButton variant="secondary">Secondary</GCButton>
                  <GCButton variant="supertask">Supertask</GCButton>
                  <GCButton variant="danger">Danger</GCButton>
                  <GCButton variant="link">Link</GCButton>
                </div>
              </div>

              <div>
                <GCHeading level={3}>Badges & Indicators</GCHeading>
                <div className="mt-4 flex flex-wrap gap-3">
                  <GCBadge variant="info">Info</GCBadge>
                  <GCBadge variant="success">Success</GCBadge>
                  <GCBadge variant="warning">Warning</GCBadge>
                  <GCBadge variant="danger">Error</GCBadge>
                </div>
              </div>

              <div>
                <GCHeading level={3}>Alerts & Notifications</GCHeading>
                <div className="mt-4 space-y-3">
                  <GCAlert variant="info">This is an informational message</GCAlert>
                  <GCAlert variant="success">Your action was successful</GCAlert>
                  <GCAlert variant="warning">Please review before continuing</GCAlert>
                  <GCAlert variant="danger">There was an error</GCAlert>
                </div>
              </div>

              <div>
                <GCHeading level={3}>Notices</GCHeading>
                <div className="mt-4 space-y-3">
                  <GCNotice variant="info" title="Important Information">
                    This service will be undergoing maintenance on Saturday.
                  </GCNotice>
                  <GCNotice variant="success">
                    Your application has been submitted successfully.
                  </GCNotice>
                </div>
              </div>

              <div>
                <GCHeading level={3}>Navigation</GCHeading>
                <div className="mt-4 space-y-4">
                  <div>
                    <GCText variant="small" className="font-semibold mb-2">Breadcrumb</GCText>
                    <GCBreadcrumb items={[
                      { label: 'Home', href: '#' },
                      { label: 'Services', href: '#' },
                      { label: 'Current Page' }
                    ]} />
                  </div>
                  <div>
                    <GCText variant="small" className="font-semibold mb-2">Pagination</GCText>
                    <GCPagination currentPage={3} totalPages={10} onPageChange={(p) => toast.info(`Page ${p}`)} />
                  </div>
                </div>
              </div>

              <div>
                <GCHeading level={3}>Progress & Stepper</GCHeading>
                <div className="mt-4 space-y-4">
                  <GCProgressBar value={65} max={100} label="Application Progress" />
                  <GCStepper steps={[
                    { label: 'Start', status: 'completed' },
                    { label: 'Information', status: 'current' },
                    { label: 'Review', status: 'upcoming' },
                    { label: 'Submit', status: 'upcoming' }
                  ]} />
                </div>
              </div>

              <div>
                <GCHeading level={3}>Typography</GCHeading>
                <div className="mt-4 space-y-3">
                  <GCHeading level={1}>Heading Level 1</GCHeading>
                  <GCHeading level={2}>Heading Level 2</GCHeading>
                  <GCHeading level={3}>Heading Level 3</GCHeading>
                  <GCText variant="lead">Lead paragraph text</GCText>
                  <GCText variant="body">Body paragraph text</GCText>
                  <GCText variant="small">Small text</GCText>
                  <GCText variant="caption">Caption text</GCText>
                </div>
              </div>

              <div>
                <GCHeading level={3}>Links</GCHeading>
                <div className="mt-4 flex flex-wrap gap-4">
                  <GCLink href="#" showIcon>Internal Link</GCLink>
                  <GCLink href="#" external showIcon>External Link</GCLink>
                  <GCLink href="#" variant="button">Button Style Link</GCLink>
                </div>
              </div>

              <div>
                <GCHeading level={3}>Icons</GCHeading>
                <div className="mt-4 flex flex-wrap gap-4">
                  <GCIcon name="House" size={32} />
                  <GCIcon name="Buildings" size={32} />
                  <GCIcon name="User" size={32} />
                  <GCIcon name="MagnifyingGlass" size={32} />
                  <GCIcon name="Bell" size={32} />
                </div>
              </div>

              <div>
                <GCHeading level={3}>Utilities</GCHeading>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-4">
                    <GCLanguageToggle />
                    <GCDateModified date="2024-01-15" />
                  </div>
                  <GCSignature />
                  <GCScreenReaderOnly>This text is only visible to screen readers</GCScreenReaderOnly>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>Complete form input collection with validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <GCInput
                id="name"
                label="Full Name"
                required
                placeholder="Enter your full name"
                helperText="As it appears on your government ID"
              />

              <GCTextarea
                id="comments"
                label="Comments"
                rows={4}
                placeholder="Enter your comments"
                helperText="Maximum 500 characters"
              />

              <GCSelect
                id="province"
                label="Province or Territory"
                required
                options={[
                  { value: '', label: 'Select...' },
                  { value: 'ON', label: 'Ontario' },
                  { value: 'QC', label: 'Quebec' },
                  { value: 'BC', label: 'British Columbia' },
                  { value: 'AB', label: 'Alberta' },
                ]}
              />

              <GCDateInput
                id="birthdate"
                label="Date of Birth"
                required
                helperText="Format: YYYY-MM-DD"
              />

              <GCFieldset legend="Preferred Contact Method" required>
                <GCCheckbox id="email" label="Email" />
                <GCCheckbox id="phone" label="Phone" />
                <GCCheckbox id="mail" label="Mail" />
              </GCFieldset>

              <GCFieldset legend="Language Preference" required>
                <GCRadio id="en" name="lang" value="en" label="English" />
                <GCRadio id="fr" name="lang" value="fr" label="Français" />
              </GCFieldset>

              <GCFileUploader
                id="documents"
                label="Upload Documents"
                accept=".pdf,.doc,.docx"
                multiple
                helperText="Accepted formats: PDF, DOC, DOCX (Max 10MB)"
              />

              <GCSearch
                placeholder="Search for services..."
                onSearch={(q) => toast.info(`Searching for: ${q}`)}
              />

              <div className="space-y-3">
                <GCHeading level={4}>Error Handling</GCHeading>
                <GCErrorMessage message="This field is required" />
                <GCErrorSummary
                  errors={[
                    { id: 'name', message: 'Full name is required' },
                    { id: 'province', message: 'Please select a province' },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Components</CardTitle>
              <CardDescription>Headers, menus, and navigation patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <GCHeading level={4}>Header</GCHeading>
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <GCHeader onSearch={(q) => toast.info(`Search: ${q}`)} />
                </div>
              </div>

              <div>
                <GCHeading level={4}>Top Navigation</GCHeading>
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <GCTopNavigation items={[
                    { label: 'Home', href: '#', active: true },
                    { label: 'Services', href: '#' },
                    { label: 'Benefits', href: '#' },
                    { label: 'About', href: '#' },
                  ]} />
                </div>
              </div>

              <div>
                <GCHeading level={4}>Side Navigation</GCHeading>
                <div className="mt-4 border rounded-lg overflow-hidden h-96">
                  <GCSideNavigation
                    title="Services"
                    items={[
                      { label: 'Employment', href: '#', active: true },
                      { 
                        label: 'Immigration', 
                        href: '#',
                        children: [
                          { label: 'Visitor Visa', href: '#' },
                          { label: 'Work Permit', href: '#' },
                          { label: 'Permanent Residence', href: '#' },
                        ]
                      },
                      { label: 'Taxes', href: '#' },
                      { label: 'Health', href: '#' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <GCHeading level={4}>Theme & Topic Menu</GCHeading>
                <div className="mt-4">
                  <GCThemeTopicMenu items={[
                    { 
                      label: 'Jobs and workplace',
                      href: '#',
                      children: [
                        { label: 'Finding a job', href: '#' },
                        { label: 'Workplace rights', href: '#' },
                      ]
                    },
                    { label: 'Immigration and citizenship', href: '#' },
                    { label: 'Travel and tourism', href: '#' },
                  ]} />
                </div>
              </div>

              <div>
                <GCHeading level={4}>Tabs</GCHeading>
                <div className="mt-4">
                  <GCTabs tabs={[
                    { id: 'overview', label: 'Overview', content: <div className="p-4 bg-muted/30 rounded">Overview content</div> },
                    { id: 'eligibility', label: 'Eligibility', content: <div className="p-4 bg-muted/30 rounded">Eligibility content</div> },
                    { id: 'apply', label: 'How to Apply', content: <div className="p-4 bg-muted/30 rounded">Application content</div> },
                  ]} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Layout Components</CardTitle>
              <CardDescription>Containers, grids, and page structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <GCHeading level={4}>Container</GCHeading>
                <div className="mt-4 space-y-3">
                  <GCContainer size="sm" className="bg-muted/30 p-4 rounded">
                    <GCText>Small container (max-width: 3xl)</GCText>
                  </GCContainer>
                  <GCContainer size="md" className="bg-muted/30 p-4 rounded">
                    <GCText>Medium container (max-width: 5xl)</GCText>
                  </GCContainer>
                  <GCContainer size="lg" className="bg-muted/30 p-4 rounded">
                    <GCText>Large container (max-width: 7xl)</GCText>
                  </GCContainer>
                </div>
              </div>

              <div>
                <GCHeading level={4}>Grid System</GCHeading>
                <div className="mt-4">
                  <GCGrid cols={3} gap="md">
                    <GCGridItem className="bg-muted/30 p-4 rounded">
                      <GCText>Column 1</GCText>
                    </GCGridItem>
                    <GCGridItem className="bg-muted/30 p-4 rounded">
                      <GCText>Column 2</GCText>
                    </GCGridItem>
                    <GCGridItem className="bg-muted/30 p-4 rounded">
                      <GCText>Column 3</GCText>
                    </GCGridItem>
                  </GCGrid>
                </div>
              </div>

              <div>
                <GCHeading level={4}>Footer</GCHeading>
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <GCFooter />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Components</CardTitle>
              <CardDescription>Tables, accordions, and complex interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <GCHeading level={4}>Data Table</GCHeading>
                <div className="mt-4">
                  <GCTable
                    columns={[
                      { key: 'name', header: 'Name' },
                      { key: 'email', header: 'Email' },
                      { key: 'province', header: 'Province' },
                      { key: 'status', header: 'Status' },
                    ]}
                    data={[
                      { name: 'John Doe', email: 'john@example.com', province: 'Ontario', status: 'Active' },
                      { name: 'Jane Smith', email: 'jane@example.com', province: 'Quebec', status: 'Pending' },
                      { name: 'Bob Johnson', email: 'bob@example.com', province: 'British Columbia', status: 'Active' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <GCHeading level={4}>Accordion</GCHeading>
                <div className="mt-4">
                  <GCAccordion items={[
                    {
                      id: '1',
                      title: 'Who is eligible for Employment Insurance?',
                      content: 'You may be eligible if you lost your job through no fault of your own and have worked for the required number of insurable employment hours.'
                    },
                    {
                      id: '2',
                      title: 'How do I apply for benefits?',
                      content: 'You can apply online through My Service Canada Account. You will need your Social Insurance Number and employment information.'
                    },
                    {
                      id: '3',
                      title: 'How long does processing take?',
                      content: 'It typically takes 28 days to process a complete EI application.'
                    },
                  ]} />
                </div>
              </div>

              <div>
                <GCHeading level={4}>Details (Expand/Collapse)</GCHeading>
                <div className="mt-4 space-y-3">
                  <GCDetails summary="Click to expand this section">
                    <GCText>This is the expanded content that was hidden by default.</GCText>
                  </GCDetails>
                  <GCDetails summary="Another expandable section" defaultOpen>
                    <GCText>This section is open by default.</GCText>
                  </GCDetails>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Guide</CardTitle>
              <CardDescription>Getting started with GC Design System components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <GCText>
                All components follow Government of Canada design standards and are:
              </GCText>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} weight="fill" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <GCText>WCAG 2.1 Level AA compliant</GCText>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} weight="fill" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <GCText>Fully responsive</GCText>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} weight="fill" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <GCText>Keyboard navigable</GCText>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} weight="fill" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <GCText>Bilingual-ready</GCText>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} weight="fill" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <GCText>Semantic HTML</GCText>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
