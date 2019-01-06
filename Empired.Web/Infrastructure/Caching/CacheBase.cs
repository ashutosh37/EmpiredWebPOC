using Empired.Common;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Security.Principal;
using System.Web;

namespace Empired.Web.Infrastructure.Caching
{
    public abstract class CacheBase
    {
        private readonly ObjectCache _cache;
        private readonly ILogger _logger;

        protected ILogger Logger { get { return _logger; } }

        protected CacheBase(ObjectCache cache, ILogger logger)
        {
            _cache = cache;
            _logger = logger;
        }

        protected virtual TimeSpan DefaultCacheTimeSpan
        {
            get { return TimeSpan.FromSeconds(Constants.GetValue(Keys.CacheTimeOut, 30)); }
        }

        protected virtual string CacheKeySuffix { get { return Global.CacheInvalidation.Ticks.ToString(); } }

        protected void ClearResult( string key, string operation)
        {
            var cacheKey = string.Format("PerKey:{0}:{1}", operation, key.ToLowerInvariant());
            var suffix = CacheKeySuffix;
            var combined = cacheKey + suffix;
            _cache.Remove(combined);
        }

        public T GetResult<T>(string key, string operation, Func<T> activator, Predicate<T> shouldCache = null)
        {
            var cacheKey = string.Format("PerKey:{0}:{1}", operation, key.ToLowerInvariant());
            var suffix = CacheKeySuffix;
            var combined = cacheKey + suffix;
            var dto = _cache[combined];
            if (dto == null)
            {
                _logger.Verbose("{LogArea}: {Cache}: GetResult {operation} {key} {suffix}", "CacheMiss", operation, cacheKey, suffix);

                var policy = GetCachePolicy();
                var v = activator();
                if (shouldCache != null && !shouldCache(v))
                    return v;
                dto = v;
                _cache.Set(combined, dto, policy);
            }
            else
            {
                _logger.Verbose("{LogArea}: {Cache}: GetResult {operation} {key} {suffix}", "CacheHit", operation, cacheKey, suffix);
            }
            return (T)dto;
        }

        public T GetResultByUser<T>(IIdentity user, string operation, Func<IIdentity, T> activator, Predicate<T> shouldCache = null)
        {
            var key = user != null ? user.Name : string.Empty;
            if (string.IsNullOrEmpty(key))
                key = "anonymous";
            var cacheKey = string.Format("PerUser:{0}:{1}", operation, key.ToLowerInvariant());
            var suffix = CacheKeySuffix;
            var combined = cacheKey + suffix;
            var dto = _cache[combined];
            if (dto == null)
            {
                _logger.Verbose("{LogArea}: {Cache}: GetResultByUser {operation} {key} {suffix}", "CacheMiss", operation, cacheKey, suffix);

                var policy = GetCachePolicy();
                var v = activator(user);
                if (shouldCache != null && !shouldCache(v))
                    return v;
                dto = v;
                _cache.Set(combined, dto, policy);
            }
            else
            {
                _logger.Verbose("{LogArea}: {Cache}: GetResultByUser {operation} {key} {suffix}","CacheHit", operation, cacheKey, suffix);
            }
            return (T)dto;
        }

        public T GetResultByGroup<T>(string operation, Func<string, T> activator, string group = "FUSE Visitors", Predicate<T> shouldCache = null)
        {
            var cacheKey = String.Format("PerGroup:{0}:{1}", operation, group.ToLowerInvariant());
            var suffix = CacheKeySuffix;
            var combined = cacheKey + suffix;
            var dto = _cache[combined];
            if (dto == null)
            {
                _logger.Verbose("{LogArea}: {Cache}: GetResultByGroup {operation} {key} {suffix}","CacheMiss", operation, cacheKey, suffix);

                var policy = GetCachePolicy();
                var v = activator(group);
                if (shouldCache != null && !shouldCache(v))
                    return v;
                dto = v;
                _cache.Set(combined, dto, policy);
            }
            else
            {
                _logger.Verbose("{LogArea}: {Cache}: GetResultByGroup {operation} {key} {suffix}","CacheHit", operation, cacheKey, suffix);
            }
            return (T)dto;
        }

        private CacheItemPolicy GetCachePolicy()
        {
            return new CacheItemPolicy { AbsoluteExpiration = DateTimeOffset.Now.Add(DefaultCacheTimeSpan) };
        }
    }
}