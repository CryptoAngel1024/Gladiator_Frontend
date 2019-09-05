<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-center"
  >
    <div class="w-7/12 space-y-8">
      <div>
        <img
          class="mx-auto h-24 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </div>
      <h1 class="font-bold text-3xl">Preface</h1>
      <div class="space-y-4 text-xl px-14">
        <p>
          Gladiator is a digital tool built for RMs that reduces the amount of
          effort required when building Presentations. As a result, RMs free up
          time to focus on other important tasks.
        </p>
        <p>
          In the following screens, you’ll get a feel for the RM Gladiator
          experience through visuals and on screen comments. Once the RM is
          logged in, they can quickly dive into building an RFP. The RFP builder
          is designed to assist the RMs as they narrow down what’s needed for
          their presentation according to the target persona and organization.
          The builder then works with the RM to fill in the generated
          presentation skeleton. The RM can do so in two ways: manually
          inputting information and/or automatically populating data fields (via
          J&J data integration) through a click of a button. The RM can preview
          the presentation at any point to see their progress and make
          adjustments when needed. Once the RM has finished the presentation,
          RMs can present the final presentation and share a custom URL to the
          client. The custom URL gives the RM complete control of the content
          that Clients see when accessing the link.
        </p>
      </div>
      <div>
        <router-link
          :to="{ name: 'login' }"
          class="py-5 px-24 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase"
        >
          Let's Begin
        </router-link>
      </div>
    </div>
  </div>
</template>

<script></script>
