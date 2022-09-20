using AutoMapper;
using NZWalks.API.Models;

namespace NZWalks.API.Profiles
{
    public class WalksProfile: Profile
    {
        public WalksProfile()
        {
            CreateMap<Models.Domain.Walk, Models.DTO.Walk>()
                .ReverseMap();
        }
    }
}
