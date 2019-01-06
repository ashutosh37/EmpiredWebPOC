using Serilog;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace Empired.Common
{
    public class Constants
    {
        private static ILogger Logger { get; set; }
        private static readonly Dictionary<string, string> Map = new Dictionary<string, string>();
        public static void SetLogger(ILogger logger)
        {
            Logger = logger;
        }
        public static string GetValue(string key, string defaultValue)
        {
            if (Map.ContainsKey(key))
                return Map[key];
            Map[key] = ConfigurationManager.AppSettings[key] ?? defaultValue;
            return Map[key];
        }

        public static bool GetValue(string key, bool defaultValue)
        {
            bool result;
            var value = GetValue(key, null);
            if (bool.TryParse(value, out result))
                return result;
            return defaultValue;
        }

        public static int GetValue(string key, int defaultValue)
        {
            int result;
            var value = GetValue(key, null);
            if (int.TryParse(GetValue(value, null), out result))
                return result;
            return defaultValue;
        }
    }
}
