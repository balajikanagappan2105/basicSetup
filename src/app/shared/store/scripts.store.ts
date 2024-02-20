import {Scripts} from '../models/script';

export const chatbotScripts: Scripts[] = [
    {name: 'preloginbot', src: '//in.fw-cdn.com/31467970/723014.js', widgetId : 'a7b9cd2c-6d12-49ea-af2e-4be8913080a1', environment : 'UAT'},
    {name: 'postloginbot', src: '//in.fw-cdn.com/31467970/723014.js', widgetId : '0bb802fa-ff5b-42cd-a759-69ca440fbeee', environment : 'UAT'},

	{name: 'preloginbot', src: '//in.fw-cdn.com/31467970/723014.js', widgetId : '6cd8e964-483c-4817-b110-7f4b85b257de', environment : 'Prod'},
    {name: 'postloginbot', src: '//in.fw-cdn.com/31467970/723014.js', widgetId : '0e75e85e-0364-4d11-9282-9d4e47f507fc', environment : 'Prod'}
];
