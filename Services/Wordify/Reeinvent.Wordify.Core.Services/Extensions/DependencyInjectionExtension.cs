using Microsoft.Extensions.DependencyInjection;

namespace Reeinvent.Wordify.Core.Services.Extensions;

public static class DependencyInjectionExtension
{
    public static IServiceCollection AddCoreServices(this IServiceCollection services)
    {
        services.AddSingleton<ISynonymService, SynonymInMemoryService>();

        return services;
    }
}