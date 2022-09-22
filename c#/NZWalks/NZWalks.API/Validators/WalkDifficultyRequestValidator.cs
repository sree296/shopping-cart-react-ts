using FluentValidation;
using System.Runtime.CompilerServices;

namespace NZWalks.API.Validators
{
    public class WalkDifficultyRequestValidator: AbstractValidator<Models.DTO.WalkDifficultyRequest>
    {
        public WalkDifficultyRequestValidator()
        {
            RuleFor(x => x.Code).NotEmpty();
        }
    }
}
