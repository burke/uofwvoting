# ===========================================================================
# Project:   Voting
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

proxy "/students", :to => "localhost:3000"
