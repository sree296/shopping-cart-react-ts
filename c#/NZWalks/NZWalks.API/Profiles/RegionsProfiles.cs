using AutoMapper;
using NZWalks.API.Models.DTO;

namespace NZWalks.API.Profiles
{
    public class RegionsProfiles: Profile
    {
        public RegionsProfiles()
        {
            CreateMap<Models.Domain.Region, Region>()
                .ReverseMap();
        }
    }
}
