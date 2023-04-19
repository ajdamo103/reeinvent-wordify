using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;

namespace Reeinvent.Common.Validations.Extensions;
public static class DependencyInjectionExtension
{
    public static IServiceCollection EnableValidations(this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();
        services.AddFluentValidationClientsideAdapters();
        services.AddValidatorsFromAssemblyContaining<ValidationsAssembly>();

        return services;
    }
}
