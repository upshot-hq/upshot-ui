export default {
  appName: 'Upshot',
  networkErrorMessage: 'Possible network error, please check your connection and try again',
  serverErrorMessage: 'Server error, try again',
  authenticatonErrorMessage: 'Authentication failed',
  failedToFetch: 'failed to fetch',
  defaultSearchPlaceholder: 'search upshot',
  footerText: '2019 upshot, inc.',
  imageSizeLimitErrorMessage: 'image size should not be more than $SIZELIMITINMB$mb',
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
      title: 'notifications',
      link: '/notifications',
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
    topCaptionPlaceholder: 'enter top caption',
    bottomCaptionPlaceholder: 'enter bottom caption',
    dropdownPlaceholder: 'select a competition',
    searchPlaceholder: 'search events',
  },
  mobileMenu: {
    creatEventText: 'create event',
  },
  authPage: {
    signupText: 'Signin with google',
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
    pageTitle: 'event',
    notFound: 'page not found :(',
    tabs: {
      detailsTab: 'details',
      postsTab: 'posts',
      winnersTab: 'winners',
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
    eventOngoing: 'This event is ongoing, check back when it\'s done...',
    eventNotStarted: 'This event has not started.',
  },
  profilePage: {
    pageTitle: 'profile',
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
  winnersPage: {
    noWinner: 'No Winner!',
  },
  notificationsPage: {
    noNotifications: 'no notifications at the moment.',
  },
  notFoundPage: {
    message: {
      partOne: 'You seem to have lost your way... click ',
      partTwo: 'here',
      partThree: ' to go home!',
    },
  },
  settings: {
    logoutText: 'log out',
    cancelText: 'cancel',
  },
};
