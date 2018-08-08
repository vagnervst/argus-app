const config = [
  {
    title: "Issues",
    rows: 3,
    columns: 3,
    widgets: [
      {
        extension: 'github-extension',
        name: 'IssuesPie',
        title: 'Hello',
        x: 1,
        y: 1,
        rows: 1,
        columns: 1,
        interval: 120000,
        config: {
          owner: 'pagarme',
          repositories: [
            'pagarme-js', 'pagarme-php', 'pagarme-net', 'pagarme-java',
            'pagarme-magento', 'pagarme-prestashop', 'pagarme-opencart'
          ],
          issuesCount: 20
        }
      },
      {
        extension: 'github-extension',
        name: 'RecentIssues',
        title: 'Recent Issues',
        x: 3,
        y: 1,
        rows: 3,
        columns: 1,
        interval: 120000,
        config: {
          owner: 'pagarme',
          repositories: [
            'pagarme-js', 'pagarme-php', 'pagarme-net', 'pagarme-java',
            'pagarme-magento', 'pagarme-prestashop', 'pagarme-opencart'
          ],
          issuesCount: 20
        }
      },
      {
        extension: 'github-extension',
        name: 'IssuesTimeline',
        title: 'Issues Timeline',
        x: 1,
        y: 3,
        rows: 1,
        columns: 2,
        interval: 120000,
        config: {
          owner: 'pagarme',
          repositories: [
            'pagarme-js', 'pagarme-php', 'pagarme-net', 'pagarme-java',
            'pagarme-magento', 'pagarme-prestashop', 'pagarme-opencart'
          ],
          limit: 20,
          daysAgo: 7
        }
      }
    ]
  },
  {
    title: "Pullrequests",
    rows: 1,
    columns: 1,
    widgets: [

    ]
  }
];

export default config;
