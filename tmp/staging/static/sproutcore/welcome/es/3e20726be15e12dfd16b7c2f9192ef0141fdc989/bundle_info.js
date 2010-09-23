        ;(function() {
          var target_name = 'sproutcore/standard_theme' ;
          if (!SC.BUNDLE_INFO) throw "SC.BUNDLE_INFO is not defined!" ;
          if (SC.BUNDLE_INFO[target_name]) return ; 

          SC.BUNDLE_INFO[target_name] = {
            requires: ['sproutcore/empty_theme'],
            styles:   ['/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet-packed.css','/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet.css'],
            scripts:  ['/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/javascript-packed.js']
          }
        })();
