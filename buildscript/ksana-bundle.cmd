browserify -g [envify --NODE_ENV 'production'] -r ksana-corpus-rom -r ksana-corpus -r ksana-corpus-search -r ksana-corpus-builder -x react-native | uglifyjs --screw-ie8 -c=dead_code,evaluate,loops,unused -m > ../static/ksana-bundle.min.js
rem browserify -g [envify --NODE_ENV 'production'] -r ksana-corpus-rom -r ksana-corpus -r ksana-corpus-search -r ksana-corpus-builder -x react-native  > ../static/ksana-bundle. 