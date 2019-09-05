#!/bin/groovy
@Library(["jpm_shared_lib@1.x"]) _                           // imports the latest stable version of JPM
import org.jnj.*
def args = [:]
args.debug = false                                           // set to true for verbose logs
args.manifestSourcesFile = '_scm_jpm/manifest-sources.yaml'  // tells JPM where to find job configuration
args.environmentMappingFile = 'environment-mapping.yaml'

new pipelines.stdPipeline().execute(args)                    // invoke the JPM Standard Pipeline