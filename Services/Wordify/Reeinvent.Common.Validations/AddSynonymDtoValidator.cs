using FluentValidation;
using Reeinvent.Common.Contracts;
using System;

namespace Reeinvent.Common.Validations;

public class AddSynonymDtoValidator : AbstractValidator<AddSynonymDto>
{
	public AddSynonymDtoValidator()
	{
        RuleFor(x => x.Word).NotEmpty().MaximumLength(40);
        RuleFor(x => x.Synonym).NotEmpty().MaximumLength(40);
    }
}