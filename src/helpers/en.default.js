export default {
  networkErrorMessage: 'Possible network error, please check your connection and try again',
  serverErrorMessage: 'Server error, try again',
  authenticatonErrorMessage: 'Authentication failed',
  failedToFetch: 'failed to fetch',
  defaultSearchPlaceholder: 'search upshot',
  layoutSideNav: {
    home: {
      title: 'home',
      link: '/home',
      icon: {
        name: 'home',
        size: '2x',
      },
    },
    explore: {
      title: 'explore',
      link: '/explore',
      icon: {
        name: 'globe',
        size: '2x',
      },
    },
    notification: {
      title: 'notification',
      link: '/',
      icon: {
        name: 'bell',
        size: '2x',
      },
    },
    profile: {
      title: 'profile',
      link: '/profile',
      icon: {
        name: 'user',
        size: '2x',
      },
    },
    settings: {
      title: 'settings',
      link: '/',
      icon: {
        name: 'cog',
        size: '2x',
      },
    },
  },
  emptySearchResultMessage: "Your search didn't return any result",
  postToEvent: {
    competitionDropdownInfo: 'select a competition you would like to enter',
    eventSearchInfo: 'search and select an event',
    captionPlaceholder: 'enter caption',
    dropdownPlaceholder: 'select a competition',
    searchPlaceholder: 'search events',
  },
  explorePage: {
    noContent: 'no content to explore :(',
    tabs: {
      allTab: 'all',
      eventsTab: 'events',
      postsTab: 'posts',
    },
  },
  eventPage: {
    notFound: 'page not found :(',
    tabs: {
      detailsTab: 'details',
      postsTab: 'posts',
      analyticsTab: 'analytics',
    },
    details: {
      about: 'about this event',
      dateAndTime: 'date and time',
      contact: 'contact',
      hashtags: 'hashtags',
    },
    posts: {
      noPosts: 'no post yet!',
    },
  },
  profilePage: {
    notFound: 'page not found :(',
    tabs: {
      eventsTab: 'events',
      postsTab: 'posts',
      bookmarksTab: 'bookmarks',
    },
    events: {
      noEvents: 'no events found. brew up some events :)',
    },
    posts: {
      noPosts: 'no posts yet! :(',
    },
    bookmarks: {
      noBookmarks: 'no bookmarked posts yet!',
    },
  },
  homepage: {
    noPosts: 'No Posts to show. Try exploring...',
  },
  searchPage: {
    noSearchQuery: 'nothing to search',
    pageTitle: 'search page',
  },
  eventCard: {
    footerLabels: {
      upcoming: 'upcoming',
      started: 'started',
      ended: 'ended',
    },
  },
};
