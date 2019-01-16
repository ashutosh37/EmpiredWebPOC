using AutoMapper;
using Empired.Web.Models;
using Empired.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Empired.Web.Mappings
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "DomainToViewModelMappings"; }
        }

        protected override void Configure()
        {


            Mapper.CreateMap<User, UserModel>()
                .ForMember(vm => vm.Id, map => map.MapFrom(m => m.UserId))
                .ForMember(vm => vm.LoginId, map => map.MapFrom(m => m.LoginName))
                .ForMember(vm => vm.DisplayName, map => map.MapFrom(m => m.DisplayName))
                .ForMember(vm => vm.Year, map => map.MapFrom(m => m.Year));
        }
    }
}