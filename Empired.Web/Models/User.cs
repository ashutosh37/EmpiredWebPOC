//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Empired.Web.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.tbl_User_BlobContainer = new HashSet<tbl_User_BlobContainer>();
        }
    
        public System.Guid UserId { get; set; }
        public string LoginName { get; set; }
        public string DisplayName { get; set; }
        public Nullable<short> Year { get; set; }
        public Nullable<bool> IsStudent { get; set; }
        public Nullable<bool> IsTeacher { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_User_BlobContainer> tbl_User_BlobContainer { get; set; }
    }
}