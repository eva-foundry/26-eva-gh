import { useState } from 'react';
import { GCButton } from '@/components/gc/GCButton';
import { GCBreadcrumb } from '@/components/gc/GCBreadcrumb';
import { GCBadge } from '@/components/gc/GCBadge';
import { GCProgressBar } from '@/components/gc/GCProgressBar';
import { GCTable } from '@/components/gc/GCTable';
import { GCAlert } from '@/components/gc/GCAlert';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  CurrencyDollar,
  Calendar,
  User,
  Bell,
  Warning
} from '@phosphor-icons/react';

export function GCDashboardTemplate() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'My Service Canada Account', href: '/account' },
    { label: 'Dashboard' },
  ];

  const [activeTab, setActiveTab] = useState<'overview' | 'claims' | 'payments'>('overview');

  const userName = 'Jean Tremblay';

  const claimStatus = {
    type: 'Employment Insurance',
    status: 'Active',
    startDate: 'November 15, 2023',
    weeksClaimed: 12,
    weeksRemaining: 33,
    nextReportDue: 'January 26, 2024'
  };

  const recentPayments = [
    { date: 'January 12, 2024', amount: 668.00, type: 'EI Regular Benefits', status: 'Deposited' },
    { date: 'December 29, 2023', amount: 668.00, type: 'EI Regular Benefits', status: 'Deposited' },
    { date: 'December 15, 2023', amount: 668.00, type: 'EI Regular Benefits', status: 'Deposited' },
  ];

  const upcomingActions = [
    {
      title: 'Submit your next EI report',
      dueDate: 'January 26, 2024',
      priority: 'high',
      description: 'Complete your bi-weekly report to continue receiving benefits'
    },
    {
      title: 'Update your banking information',
      dueDate: 'February 1, 2024',
      priority: 'medium',
      description: 'Ensure your direct deposit information is current'
    }
  ];

  const documents = [
    { name: 'Record of Employment', date: 'November 10, 2023', type: 'PDF' },
    { name: 'EI Application Confirmation', date: 'November 15, 2023', type: 'PDF' },
    { name: 'Notice of Decision', date: 'November 20, 2023', type: 'PDF' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <GCBreadcrumb items={breadcrumbs} />
      
      <div className="mt-8 space-y-8">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Welcome back, {userName}
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your benefits and services in one place
            </p>
          </div>
          <div className="hidden md:block">
            <GCButton variant="secondary">
              <Bell size={18} weight="duotone" className="mr-2" />
              Notifications
            </GCButton>
          </div>
        </section>

        {upcomingActions.filter(a => a.priority === 'high').length > 0 && (
          <GCAlert variant="warning">
            <div className="flex items-start gap-3">
              <Warning size={24} weight="fill" />
              <div>
                <strong>Action required:</strong> You have {upcomingActions.filter(a => a.priority === 'high').length} pending task(s) that require your attention.
              </div>
            </div>
          </GCAlert>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle size={24} weight="fill" className="text-green-600" />
              </div>
              <GCBadge variant="success">Active</GCBadge>
            </div>
            <h3 className="text-lg font-semibold mb-1">Current Claim</h3>
            <p className="text-3xl font-bold text-primary mb-2">{claimStatus.type}</p>
            <p className="text-sm text-muted-foreground">
              Started {claimStatus.startDate}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <CurrencyDollar size={24} weight="fill" className="text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-1">Last Payment</h3>
            <p className="text-3xl font-bold text-primary mb-2">
              ${recentPayments[0].amount.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Deposited {recentPayments[0].date}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock size={24} weight="fill" className="text-orange-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-1">Next Report Due</h3>
            <p className="text-3xl font-bold text-primary mb-2">
              {new Date(claimStatus.nextReportDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <p className="text-sm text-muted-foreground">
              {claimStatus.nextReportDue}
            </p>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Claim Progress</h2>
            <span className="text-sm text-muted-foreground">
              {claimStatus.weeksClaimed} of {claimStatus.weeksClaimed + claimStatus.weeksRemaining} weeks claimed
            </span>
          </div>
          <GCProgressBar 
            value={claimStatus.weeksClaimed} 
            max={claimStatus.weeksClaimed + claimStatus.weeksRemaining}
            label={`${claimStatus.weeksRemaining} weeks remaining`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            You can receive up to {claimStatus.weeksClaimed + claimStatus.weeksRemaining} weeks of benefits based on your work history and regional unemployment rate.
          </p>
        </div>

        <section aria-labelledby="actions-heading">
          <h2 id="actions-heading" className="text-2xl font-bold mb-4">Action items</h2>
          <div className="space-y-4">
            {upcomingActions.map((action, index) => (
              <div 
                key={index}
                className={`border-l-4 rounded-lg p-6 ${
                  action.priority === 'high' 
                    ? 'border-l-orange-500 bg-orange-50/50' 
                    : 'border-l-blue-500 bg-blue-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{action.title}</h3>
                      {action.priority === 'high' && (
                        <GCBadge variant="warning">Urgent</GCBadge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{action.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} weight="regular" />
                      <span className="font-semibold">Due: {action.dueDate}</span>
                    </div>
                  </div>
                  <GCButton variant={action.priority === 'high' ? 'primary' : 'secondary'}>
                    {action.priority === 'high' ? 'Complete now' : 'View details'}
                  </GCButton>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          <section aria-labelledby="payments-heading" className="bg-card border rounded-lg p-6">
            <h2 id="payments-heading" className="text-2xl font-bold mb-4">Recent payments</h2>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">{payment.type}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">${payment.amount.toFixed(2)}</p>
                    <GCBadge variant="success">{payment.status}</GCBadge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <GCButton variant="link">View all payments</GCButton>
            </div>
          </section>

          <section aria-labelledby="documents-heading" className="bg-card border rounded-lg p-6">
            <h2 id="documents-heading" className="text-2xl font-bold mb-4">Recent documents</h2>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <FileText size={20} weight="duotone" className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.date}</p>
                  </div>
                  <GCButton variant="link" size="small">
                    Download
                  </GCButton>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <GCButton variant="link">View all documents</GCButton>
            </div>
          </section>
        </div>

        <section aria-labelledby="quick-links-heading" className="bg-muted/30 rounded-lg p-6">
          <h2 id="quick-links-heading" className="text-2xl font-bold mb-4">Quick links</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="flex items-center gap-3 p-4 bg-card border rounded-lg hover:border-primary transition-colors group">
              <User size={24} weight="duotone" className="text-primary" />
              <span className="font-semibold group-hover:text-primary transition-colors">Profile settings</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-4 bg-card border rounded-lg hover:border-primary transition-colors group">
              <FileText size={24} weight="duotone" className="text-primary" />
              <span className="font-semibold group-hover:text-primary transition-colors">Tax slips</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-4 bg-card border rounded-lg hover:border-primary transition-colors group">
              <CurrencyDollar size={24} weight="duotone" className="text-primary" />
              <span className="font-semibold group-hover:text-primary transition-colors">Direct deposit</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-4 bg-card border rounded-lg hover:border-primary transition-colors group">
              <Bell size={24} weight="duotone" className="text-primary" />
              <span className="font-semibold group-hover:text-primary transition-colors">Notifications</span>
            </a>
          </div>
        </section>

        <section aria-labelledby="help-heading" className="border-t pt-8">
          <h2 id="help-heading" className="text-2xl font-bold mb-4">Need help?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Contact us</h3>
              <p className="text-muted-foreground mb-4">
                Have questions about your claim or benefits?
              </p>
              <ul className="space-y-2 text-base mb-4">
                <li>Phone: 1-800-206-7218</li>
                <li>TTY: 1-800-926-9105</li>
                <li>Monday to Friday, 8:30 am to 4:30 pm</li>
              </ul>
              <GCButton variant="secondary">
                Contact Service Canada
              </GCButton>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Help Centre</h3>
              <p className="text-muted-foreground mb-4">
                Find answers to common questions about EI benefits.
              </p>
              <div className="space-y-2 mb-4">
                <GCButton variant="link">How to complete your EI report</GCButton>
                <GCButton variant="link">Understanding your payments</GCButton>
                <GCButton variant="link">What to do if you return to work</GCButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
