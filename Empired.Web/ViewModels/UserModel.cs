
using System;
using System.Linq;

using Newtonsoft.Json;

namespace Empired.Web.ViewModels
{

    [Serializable]
    public class UserModel
    {
        private Guid _id;
        private string _login;
        [JsonIgnore]
        private string _displayName;

        public Guid Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string LoginId
        {
            get { return _login; }
            set { _login = value; }
        }

        public short Year { get; set; }


        protected internal string DisplayName
        {
            get { return _displayName; }
            set { _displayName = value; }
        }

        public bool IsAuthenticated
        {
            get { return !string.IsNullOrEmpty(LoginId); }
        }

        public bool IsUserStudent { get; set; }

        public bool IsUserTeacher { get; set; }


    }

    [Serializable]
    public class UserModelDetailed : UserModel
    {
        private bool _isUserQA;

        public bool IsUserQA
        {
            get { return _isUserQA; }
            set { _isUserQA = value; }
        }

        private bool _isUserStudent;

        public bool IsUserStudent
        {
            get { return _isUserStudent; }
            set { _isUserStudent = value; }
        }

        public string RenderName
        {
            get
            {
                var name = (DisplayName ?? "");
                var pieces = name.Split(',');
                if (pieces.Length == 2)
                {
                    return pieces[1].Trim() + " " + pieces[0].Trim();
                }
                return name;
            }
            set { }
        }
    }
}
