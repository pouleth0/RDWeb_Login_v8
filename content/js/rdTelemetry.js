// -----------------------------------------------------------------------
//  <copyright file=rdwebclient-telemetry.js company="Microsoft"
//      Copyright (c) Microsoft. All rights reserved.
//  </copyright>
//  <summary>
//      This is a auto-generated file using JSLLCodeGen (http://usnuget/packages/JSLLCodeGen/)
//  </summary>
// -----------------------------------------------------------------------

var config = {
    instrumentationKey:"fde72650f0b8444e83d7855ca18dc129-7f47c609-5859-42d6-a0da-3e666c7ac715-7101"
};

awa.init(config);

awa._registerSchemas([        {
            "name": "Microsoft.RDS.Web.Client.TelemetryBase",
            "Microsoft.RDS.Web.Client.TelemetryBase":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "eventVersion",
                            "type": "uint32"
                        },
                        {
                            "name": "appVersion",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.RDS.Web.Client.CrashStackTrace",
            "Microsoft.RDS.Web.Client.CrashStackTrace":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "exception",
                            "type": "string"
                        },
                        {
                            "name": "eventVersion",
                            "type": "uint32"
                        },
                        {
                            "name": "appVersion",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.RDS.Web.Client.DailyDeviceInfo",
            "Microsoft.RDS.Web.Client.DailyDeviceInfo":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "locale",
                            "type": "string"
                        },
                        {
                            "name": "hardwareModeEnabled",
                            "type": "bool"
                        },
                        {
                            "name": "eventVersion",
                            "type": "uint32"
                        },
                        {
                            "name": "appVersion",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.RDS.Web.Client.DailyResourceLaunchMethod",
            "Microsoft.RDS.Web.Client.DailyResourceLaunchMethod":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "resourceLaunchMethod",
                            "type": "string"
                        },
                        {
                            "name": "eventVersion",
                            "type": "uint32"
                        },
                        {
                            "name": "appVersion",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.RDS.Web.Client.DailyResourceInfo",
            "Microsoft.RDS.Web.Client.DailyResourceInfo":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "feedCountMT",
                            "type": "uint32"
                        },
                        {
                            "name": "publishedDesktopCount",
                            "type": "uint32"
                        },
                        {
                            "name": "publishedDesktopCountMT",
                            "type": "uint32"
                        },
                        {
                            "name": "publishedAppCount",
                            "type": "uint32"
                        },
                        {
                            "name": "publishedAppCountMT",
                            "type": "uint32"
                        },
                        {
                            "name": "publishedFolderCount",
                            "type": "uint32"
                        },
                        {
                            "name": "publishedFolderCountMT",
                            "type": "uint32"
                        },
                        {
                            "name": "eventVersion",
                            "type": "uint32"
                        },
                        {
                            "name": "appVersion",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.RDS.Web.Client.SessionLaunch",
            "Microsoft.RDS.Web.Client.SessionLaunch":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "success",
                            "type": "bool"
                        },
                        {
                            "name": "sourceType",
                            "type": "string"
                        },
                        {
                            "name": "connectionId",
                            "type": "string"
                        },
                        {
                            "name": "launchTime",
                            "type": "uint32"
                        },
                        {
                            "name": "correlationId",
                            "type": "string"
                        },
                        {
                            "name": "resolutionUsed",
                            "type": "string"
                        },
                        {
                            "name": "scaleUsed",
                            "type": "uint32"
                        },
                        {
                            "name": "eventVersion",
                            "type": "uint32"
                        },
                        {
                            "name": "appVersion",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.RDS.Web.Client.SessionData",
            "Microsoft.RDS.Web.Client.SessionData":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "simpleDisconnectCode",
                            "type": "uint32"
                        },
                        {
                            "name": "userInitiated",
                            "type": "bool"
                        },
                        {
                            "name": "serverStackDisconnectCode",
                            "type": "uint32"
                        },
                        {
                            "name": "correlationId",
                            "type": "string"
                        },
                        {
                            "name": "minutes",
                            "type": "uint32"
                        },
                        {
                            "name": "arcTriggered",
                            "type": "uint32"
                        },
                        {
                            "name": "arcSuccess",
                            "type": "uint32"
                        },
                        {
                            "name": "arcAvgTimeToConnect",
                            "type": "uint32"
                        },
                        {
                            "name": "eventVersion",
                            "type": "uint32"
                        },
                        {
                            "name": "appVersion",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.RDS.Web.Client.InSessionActivity",
            "Microsoft.RDS.Web.Client.InSessionActivity":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "correlationId",
                            "type": "string"
                        },
                        {
                            "name": "sessionSwitched",
                            "type": "uint32"
                        },
                        {
                            "name": "appSwitched",
                            "type": "uint32"
                        },
                        {
                            "name": "resolutionChanged",
                            "type": "uint32"
                        },
                        {
                            "name": "clipboardUsed",
                            "type": "bool"
                        },
                        {
                            "name": "audioUsed",
                            "type": "bool"
                        },
                        {
                            "name": "eventVersion",
                            "type": "uint32"
                        },
                        {
                            "name": "appVersion",
                            "type": "string"
                        }
                    ]
                }
            }
        }
        ]);
/*
// Examples of how to instantiate and use the custom events

//  Create an event of type: Microsoft.RDS.Web.Client.TelemetryBase
var event =
    {
        "name": "Microsoft.RDS.Web.Client.TelemetryBase",
        "content":
        {
            "Microsoft.RDS.Web.Client.TelemetryBase":
            {
                // Part C
                "eventVersion": 0, // optional uint32
                "appVersion": "string" // optional string
            }
        }
    };


//  Create an event of type: Microsoft.RDS.Web.Client.CrashStackTrace
var event =
    {
        "name": "Microsoft.RDS.Web.Client.CrashStackTrace",
        "content":
        {
            "Microsoft.RDS.Web.Client.CrashStackTrace":
            {
                // Part C
                "exception": "string", // optional string
                "eventVersion": 0, // optional uint32
                "appVersion": "string" // optional string
            }
        }
    };


//  Create an event of type: Microsoft.RDS.Web.Client.DailyDeviceInfo
var event =
    {
        "name": "Microsoft.RDS.Web.Client.DailyDeviceInfo",
        "content":
        {
            "Microsoft.RDS.Web.Client.DailyDeviceInfo":
            {
                // Part C
                "locale": "string", // optional string
                "hardwareModeEnabled": true, // optional bool
                "eventVersion": 0, // optional uint32
                "appVersion": "string" // optional string
            }
        }
    };


//  Create an event of type: Microsoft.RDS.Web.Client.DailyResourceLaunchMethod
var event =
    {
        "name": "Microsoft.RDS.Web.Client.DailyResourceLaunchMethod",
        "content":
        {
            "Microsoft.RDS.Web.Client.DailyResourceLaunchMethod":
            {
                // Part C
                "resourceLaunchMethod": "string", // optional string
                "eventVersion": 0, // optional uint32
                "appVersion": "string" // optional string
            }
        }
    };


//  Create an event of type: Microsoft.RDS.Web.Client.DailyResourceInfo
var event =
    {
        "name": "Microsoft.RDS.Web.Client.DailyResourceInfo",
        "content":
        {
            "Microsoft.RDS.Web.Client.DailyResourceInfo":
            {
                // Part C
                "feedCountMT": 0, // optional uint32
                "publishedDesktopCount": 0, // optional uint32
                "publishedDesktopCountMT": 0, // optional uint32
                "publishedAppCount": 0, // optional uint32
                "publishedAppCountMT": 0, // optional uint32
                "publishedFolderCount": 0, // optional uint32
                "publishedFolderCountMT": 0, // optional uint32
                "eventVersion": 0, // optional uint32
                "appVersion": "string" // optional string
            }
        }
    };


//  Create an event of type: Microsoft.RDS.Web.Client.SessionLaunch
var event =
    {
        "name": "Microsoft.RDS.Web.Client.SessionLaunch",
        "content":
        {
            "Microsoft.RDS.Web.Client.SessionLaunch":
            {
                // Part C
                "success": true, // optional bool
                "sourceType": "string", // optional string
                "connectionId": "string", // optional string
                "launchTime": 0, // optional uint32
                "correlationId": "string", // optional string
                "resolutionUsed": "string", // optional string
                "scaleUsed": 0, // optional uint32
                "eventVersion": 0, // optional uint32
                "appVersion": "string" // optional string
            }
        }
    };


//  Create an event of type: Microsoft.RDS.Web.Client.SessionData
var event =
    {
        "name": "Microsoft.RDS.Web.Client.SessionData",
        "content":
        {
            "Microsoft.RDS.Web.Client.SessionData":
            {
                // Part C
                "simpleDisconnectCode": 0, // optional uint32
                "userInitiated": true, // optional bool
                "serverStackDisconnectCode": 0, // optional uint32
                "correlationId": "string", // optional string
                "minutes": 0, // optional uint32
                "arcTriggered": 0, // optional uint32
                "arcSuccess": 0, // optional uint32
                "arcAvgTimeToConnect": 0, // optional uint32
                "eventVersion": 0, // optional uint32
                "appVersion": "string" // optional string
            }
        }
    };


//  Create an event of type: Microsoft.RDS.Web.Client.InSessionActivity
var event =
    {
        "name": "Microsoft.RDS.Web.Client.InSessionActivity",
        "content":
        {
            "Microsoft.RDS.Web.Client.InSessionActivity":
            {
                // Part C
                "correlationId": "string", // optional string
                "sessionSwitched": 0, // optional uint32
                "appSwitched": 0, // optional uint32
                "resolutionChanged": 0, // optional uint32
                "clipboardUsed": true, // optional bool
                "audioUsed": true, // optional bool
                "eventVersion": 0, // optional uint32
                "appVersion": "string" // optional string
            }
        }
    };

*/
