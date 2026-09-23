interface TermsClause {
  title: string
  paragraphs: string[]
  bulletPoints?: string[]
}

const TERMS_LAST_UPDATED = '12 September 2026'

const TERMS_CLAUSES: TermsClause[] = [
  {
    title: 'As-Is / No Guarantee',
    paragraphs: [
      'The Script is provided "as is" and "as available." We do not guarantee that the Script will always function correctly, remain compatible with third-party services, be free of bugs or errors, or meet your individual requirements. By purchasing the Script, you acknowledge and accept these risks.',
    ],
  },
  {
    title: 'No Refunds',
    paragraphs: [
      'All purchases are final and non-refundable, except where required by applicable law. No refunds, cancellations, or reimbursements will be provided due to bugs, compatibility issues, dissatisfaction, lack of use, or other reasons.',
    ],
  },
  {
    title: 'Discontinuation',
    paragraphs: [
      'We reserve the right to modify, suspend, or permanently discontinue the Script at any time, with or without notice. This includes updates, features, support, access, compatibility, or the Script itself. No refund or compensation will be owed due to discontinuation, except where required by law.',
    ],
  },
  {
    title: 'Pricing',
    paragraphs: [
      'We reserve the right to change the price of the Script at any time, with or without prior notice. We are not obligated to honor previous prices, discounts, promotions, or offers after they have been changed or expired.',
    ],
  },
  {
    title: 'Updates & Changes',
    paragraphs: [
      'The Script may be updated, modified, improved, or changed at any time. Features may be added, removed, or modified without notice. We are under no obligation to provide updates or maintain any particular feature indefinitely.',
    ],
  },
  {
    title: 'Third-Party Services',
    paragraphs: [
      'The Script may rely on third-party software, platforms, APIs, websites, or services. We are not responsible for third-party outages, API changes, restrictions, bans, policy changes, discontinued services, or other actions that affect the Script. If a third-party service changes or becomes unavailable, the Script may partially or completely stop functioning.',
    ],
  },
  {
    title: 'License & Usage',
    paragraphs: [
      'Your purchase grants you a limited, non-exclusive, non-transferable license to use the Script.',
      'You may not:',
    ],
    bulletPoints: [
      'Resell, redistribute, or sublicense the Script.',
      'Share, leak, or publicly distribute the Script or its files.',
      'Claim ownership of the Script or its source code.',
      'Modify and redistribute the Script as your own product.',
      'Use the Script for unlawful purposes.',
    ],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'All rights, title, and interest in the Script, including its code, design, documentation, branding, and related materials, remain the property of Aurora unless otherwise stated.',
      'Purchasing the Script does not transfer ownership or intellectual-property rights to you.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, Aurora shall not be liable for any direct, indirect, incidental, consequential, or other damages arising from the purchase or use of the Script, including loss of data, profits, access, business interruption, account restrictions, or third-party service issues.',
    ],
  },
  {
    title: 'Third-Party Account Restrictions',
    paragraphs: [
      "If the Script is used with a third-party platform, you are solely responsible for complying with that platform's Terms of Service, rules, and policies. We are not responsible for warnings, suspensions, bans, restrictions, or termination of third-party accounts resulting from your use of the Script.",
    ],
  },
  {
    title: 'Changes to These Terms',
    paragraphs: [
      'We reserve the right to modify these Terms at any time. Updated Terms may be posted or made available to users. Continued use of the Script after changes constitutes acceptance of the revised Terms.',
    ],
  },
  {
    title: 'Acceptance',
    paragraphs: [
      'By purchasing, downloading, accessing, or using Aurora, you confirm that you have read, understood, and agreed to these Terms.',
      'If you do not agree to these Terms, do not purchase, download, or use the Script.',
    ],
  },
]

function TermsClauseArticle({ clause }: { clause: TermsClause }) {
  return (
    <article>
      <h3 className="text-lg font-semibold text-white">{clause.title}</h3>
      <div className="mt-2 flex flex-col gap-3">
        {clause.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-neutral-400">
            {paragraph}
          </p>
        ))}
      </div>
      {clause.bulletPoints && (
        <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5">
          {clause.bulletPoints.map((bulletPoint) => (
            <li key={bulletPoint} className="text-sm leading-relaxed text-neutral-400">
              {bulletPoint}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export function TermsOfService() {
  return (
    <section id="terms" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 sm:px-6">
      <h2 className="text-3xl font-bold text-white">Terms of Service</h2>
      <p className="mt-2 text-sm text-neutral-500">Last Updated: {TERMS_LAST_UPDATED}</p>
      <p className="mt-6 text-sm leading-relaxed text-neutral-400">
        By purchasing, downloading, accessing, or using Aurora, you acknowledge that you have read,
        understood, and agreed to these Terms.
      </p>
      <div className="mt-10 flex flex-col gap-8">
        {TERMS_CLAUSES.map((clause) => (
          <TermsClauseArticle key={clause.title} clause={clause} />
        ))}
      </div>
    </section>
  )
}
