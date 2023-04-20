namespace Reeinvent.Common.Contracts;

public class AddSynonymDto
{
    public string Word { get; init; } = default!;
    public string Synonym { get; init; } = default!;
}