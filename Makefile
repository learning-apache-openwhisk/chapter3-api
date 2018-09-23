apidemo:
	wsk package update apidemo

promise: apidemo
	wsk action update apidemo/promise-genuuid apidemo/promise/promise-genuuid.js  --web true

promise-test: promise
	wsk action invoke apidemo/promise-genuuid -r

invoke: apidemo
	wsk action update apidemo/invoke-genuuid apidemo/invoke/invoke-genuuid.js  --web true
	wsk action update apidemo/invoke-genuuid-list apidemo/invoke/invoke-genuuid-list.js  --web true

invoke-url: invoke
	wsk action get apidemo/invoke-genuuid --url
	wsk action get apidemo/invoke-genuuid-list  --url

invoke-test: invoke
	curl $$(wsk action get apidemo/invoke-genuuid --url | tail -1)
	curl $$(wsk action get apidemo/invoke-genuuid-list  --url | tail -1)

trigger: apidemo
	wsk action update  apidemo/activation apidemo/trigger/activation.js
	wsk action update  apidemo/trigger apidemo/trigger/trigger.js
	wsk action update  apidemo/trigger-output apidemo/trigger/trigger-output.js
	wsk trigger update apidemo-trigger
	wsk rule update apidemo-trigger-uuid apidemo-trigger apidemo/promise-genuuid
	wsk rule update apidemo-trigger-clock apidemo-trigger apidemo/clock

trigger-test:

.PHONY: apidemo promise promise-test invoke invoke-url invoke-test trigger trigger-test
