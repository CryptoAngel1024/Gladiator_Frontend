import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
const LAYOUT_DEFAULT = 'layout-default'

export default [
  { path: '/', redirect: { name: 'callback' } },
  {
    path: '/dashboard',
    redirect: {
      name: 'dashboard',
    },
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('@/views/auth/CallBackView.vue'),
    meta: {
      layout: 'layout-default',
      title: 'CallBack',
      isPublic: true,
      params: { department: DEFAULT_DEPARTMENT },
    },
  },
  {
    path: '/:department/overview',
    redirect: { name: 'overview-users' },
  },
  // {
  //   path: '/:department/overview/users',
  //   name: 'overview-users',
  //   component: () => import('@/views/home/GraphChart.vue'),
  //   meta: {
  //     title: 'Overview - Users',
  //   },
  // },
  {
    path: '/:department/overview/new-users',
    name: 'overview-newusers',
    component: () => import('@/views/home/GraphChart.vue'),
    meta: {
      title: 'Overview - New Users',
    },
  },
  {
    path: '/:department/overview/average-engagement-time',
    name: 'overview-engagement',
    component: () => import('@/views/home/GraphChart.vue'),
    meta: {
      title: 'Overview - Engagement',
    },
  },
  {
    path: '/login',
    name: 'defaultLogin',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Login',
      isPublic: true,
    },
  },
  {
    path: '/select-department',
    name: 'selectDepartment',
    component: () => import('@/views/SelectDepartment.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'selectDepartment',
      isPublic: true,
    },
  },

  {
    path: '/:department/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Login',
      isPublic: true,
    },
  },
  {
    path: '/:department/new-password',
    name: 'newPassword',
    component: () => import('@/views/auth/NewPasswordView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'New Password',
      isPublic: true,
    },
  },
  {
    path: '/:department?/forgot-password',
    name: 'forgotPassword',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Reset Password',
      isPublic: true,
    },
  },
  {
    path: '/:department?/reset-password',
    name: 'resetPassword',
    component: () => import('@/views/auth/ResetPasswordView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Reset Password',
      isPublic: true,
    },
  },
  {
    path: '/:department?/dashboard',
    name: 'dashboard',
    component: () => import('@/views/home/DashboardView.vue'),
    meta: {
      title: 'Dashboard',
    },
  },
  {
    // step 1
    path: '/:department/new-presentation',
    name: 'new-presentation',
    component: () => import('@/views/newRfp/NewRfpView.vue'),
    meta: {
      title: 'Create Presentation',
    },
  },
  {
    // start RFP
    path: '/:department/new-presentation/:templateId',
    name: 'new-presentation-template',
    component: () => import('@/views/newRfp/NewRfpView.vue'),
  },
  {
    // step 1 to 6
    path: '/:department/update-presentation/:presentationId/:step/:subStep',
    name: 'update-presentation',
    component: () => import('@/views/newRfp/NewRfpView.vue'),
    meta: {
      title: 'Update Presentation Details',
    },
  },
  {
    // step 1 to 6
    path: '/:department/update-presentation/:presentationId/:step/:subStep/custom-slides/:selectionType/:slideStep',
    name: 'presentation-create-custom-slide',
    component: () => import('@/components/newRfp/CustomSlideStep.vue'),
    meta: {
      title: 'Create custom slide for presentation',
    },
  },
  {
    // step 1 to 6
    path: '/:department/update-presentation/:presentationId/:step/:subStep/custom-slides/edit/:customSlideId/:slideStep',
    name: 'presentation-update-custom-slide',
    component: () => import('@/components/newRfp/CustomSlideStep.vue'),
    meta: {
      title: 'Update custom slide for presentation',
    },
  },
  {
    path: '/:department/my-presentations',
    name: 'my-presentations',
    component: () => import('@/views/MyRfpsView.vue'),
    meta: {
      title: 'My Presentations',
    },
  },
  {
    path: '/:department/published',
    name: 'published',
    component: () => import('@/views/PublishedLinksView.vue'),
    meta: {
      title: 'Published Links',
    },
  },
  {
    path: '/:department/builder/:presentationId/:slideId',
    name: 'builder',
    component: () => import('@/views/builder/builderView.vue'),
    meta: {
      title(to) {
        return `Builder | ${to.params.slideId || ''}`
      },
    },
  },
  {
    path: '/:department/create-link/:presentationId',
    name: 'create-link',
    component: () => import('@/views/newRfp/CreateLinkView.vue'),
    meta: {
      title: 'Create Link',
    },
  },
  {
    path: '/:department/update-link/:presentationId/:linkId',
    name: 'update-link',
    component: () => import('@/views/newRfp/CreateLinkView.vue'),
    meta: {
      title: 'Update Link',
    },
  },
  {
    path: '/:department/create-link/starred/:presentationId',
    name: 'create-link-starred',
    component: () => import('@/views/newRfp/CreateLinkView.vue'),
    meta: {
      title: 'Create Link',
    },
  },
  {
    path: '/:department/update-link/starred/:presentationId/:linkId',
    name: 'update-link-starred',
    component: () => import('@/views/newRfp/CreateLinkView.vue'),
    meta: {
      title: 'Update Link',
    },
  },
  {
    path: '/:department/templates',
    name: 'templates',
    component: () => import('@/views/templates/TemplatesView.vue'),
  },
  {
    path: '/:department/templates/new',
    name: 'templates-new',
    component: () => import('@/views/templates/CreateTemplatesView.vue'),
  },
  {
    path: '/:department/templates/:templateID',
    name: 'templates-edit',
    component: () => import('@/views/templates/EditTemplatesView.vue'),
  },
  {
    path: '/:department/shared-with-me',
    name: 'shared-with-me',
    component: () => import('@/views/SharedWithMeView.vue'),
  },
  {
    path: '/:department/resources',
    name: 'resources',
    component: () => import('@/views/resources/ResourcesView.vue'),
    meta: {
      title: 'Resources',
    },
  },
  {
    path: '/:department/resources/:folderName',
    name: 'resources-folder',
    component: () => import('@/components/resources/items/NestFolder.vue'),
    meta: {
      title: 'Resources',
    },
  },
  {
    path: '/:department?/settings/profile',
    name: 'settings-profile',
    component: () => import('@/views/setting/ProfileBody.vue'),
    // component: () => import("@/views/setting/ProfileBody.vue"),
    meta: {
      title: 'Profile',
    },
  },
  {
    path: '/:department/settings/email-body',
    name: 'settings-email-body',
    component: () => import('@/views/setting/EmailBody.vue'),
    meta: {
      title: 'Email Body',
    },
  },
  {
    path: '/:department/settings/custom-slides',
    name: 'settings-custom-slides',
    component: () => import('@/views/setting/CustomSlides.vue'),
    meta: {
      title: 'Custome slides',
    },
  },
  {
    path: '/:department/settings/custom-slides/create/:slideStep',
    name: 'create-custom-slide',
    component: () => import('@/components/newRfp/CustomSlideStep.vue'),
    meta: {
      title: 'Create Custome Slide',
    },
  },
  {
    path: '/:department/settings/custom-slides/edit/:customSlideId/:slideStep',
    name: 'update-custom-slide',
    component: () => import('@/components/newRfp/CustomSlideStep.vue'),
    meta: {
      title: 'Update Custome Slide',
    },
  },

  {
    path: '/:department?/support',
    name: 'support',
    component: () => import('@/views/support/supportView.vue'),
    meta: {
      title: 'Support',
      isPublic: true,
    },
  },
  {
    path: '/:department/view/29107879HTYI89',
    name: 'clientLogin',
    component: () => import('@/views/client/deprecated_ClientLoginView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Welcome',
    },
  },
  {
    path: '/:department/preface',
    name: 'preface',
    component: () => import('@/views/PrefaceView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
    },
  },
  {
    path: '/:department/slideOverview/:presentationId/:slideId',
    name: 'slideOverview',
    component: () => import('@/views/slides/slideOverview.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'slide overview',
    },
  },
  {
    path: '/:department/linkOverview/:clientName/:hyperLink/:slideId',
    name: 'linkOverview',
    component: () => import('@/views/slides/slideOverview.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'slide overview',
    },
  },
  {
    path: '/:department/slide/:presentationId',
    name: 'slide',
    component: () => import('@/views/slides/PresentationView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title(to) {
        return `Slide ${to.hash?.slice(2) || ''}`
      },
    },
  },
  {
    path: '/:department/present/:clientName/:hyperLink',
    name: 'present',
    component: () => import('@/views/slides/PresentationView.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title(to) {
        return `Slide ${to.hash?.slice(2) || ''}`
      },
    },
  },
  {
    path: '/:department/present/:clientName/:hyperLink/printPdf',
    name: 'link-pdf-export',
    component: () => import('@/views/pdfs/PresentationViewPDF.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Link Print PDF',
      isPublic: true,
    },
  },
  {
    path: '/:department/slide/:presentationId/pdf',
    name: 'slide-pdf-export',
    component: () => import('@/views/pdfs/PresentationViewPDF.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Slide Print PDF',
      isPublic: true,
    },
  },
  {
    path: '/:department/presentation/:presentationId/printOverview',
    name: 'print-overview-export',
    component: () => import('@/views/pdfs/PrintOverviewPDF.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Print Overview PDF',
      isPublic: true,
    },
  },
  {
    path: '/:department/presentation/:presentationId/printCustomerChecklist',
    name: 'print-checklist-export',
    component: () => import('@/views/pdfs/PrintCustomerChecklistPDF.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Print Checklist PDF',
      isPublic: true,
    },
  },
  {
    path: '/:department/presentation/:presentationId/slide-deck',
    name: 'slide-deck-export',
    component: () => import('@/views/pdfs/SlideDeckPDF.vue'),
    meta: {
      layout: LAYOUT_DEFAULT,
      title: 'Slide Deck PDF',
      isPublic: true,
    },
  },
  {
    path: '/:department',
    redirect: { name: 'dashboard' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/NotFound404.vue'),
    meta: {
      title: '404',
    },
  },
]
