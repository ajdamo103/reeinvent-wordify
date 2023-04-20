using Microsoft.Extensions.DependencyInjection;
using Reeinvent.Wordify.Core.Services;
using Reeinvent.Wordify.Core.Services.Extensions;

var serviceProvider = new ServiceCollection()
    .AddCoreServices()
    .BuildServiceProvider();

var synonyms = serviceProvider.GetRequiredService<ISynonymService>();

synonyms.Add("wash", "clean");
synonyms.Add("wash", "super clean");
synonyms.Add("super clean", "top clean");
synonyms.Add("happy", "pleased");
synonyms.Add("happy", "euphoric");
synonyms.Add("pleased", "content");
synonyms.Add("content", "pleased");

Console.WriteLine("Synonyms for 'top clean':");

foreach (var synonym in synonyms.GetSynonims("top clean"))
{
    Console.WriteLine(synonym);
}

Console.WriteLine("Synonyms for 'wash':");

foreach (var synonym in synonyms.GetSynonims("wash"))
{
    Console.WriteLine(synonym);
}

Console.ReadLine();