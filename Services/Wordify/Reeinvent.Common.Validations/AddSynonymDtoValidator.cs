using FluentValidation;
using Reeinvent.Common.Contracts;

namespace Reeinvent.Common.Validations;

public class AddSynonymDtoValidator : AbstractValidator<AddSynonymDto>
{
	public AddSynonymDtoValidator()
	{
        RuleFor(x => x.Word).NotEmpty().MaximumLength(40);
        RuleFor(x => x.Synonym).NotEmpty().MaximumLength(40).NotEqual(x => x.Word);
    }
}