using System.Collections.Concurrent;

namespace Reeinvent.Wordify.Core.Services;

internal class SynonymInMemoryService : ISynonymService
{
    private ConcurrentDictionary<string, HashSet<string>> _wordSynonyms;
    private readonly object _addLock = new();

    public SynonymInMemoryService()
    {
        _wordSynonyms = new ConcurrentDictionary<string, HashSet<string>>();
    }

    public bool Add(string word, string synonym)
    {
        word = word.ToLower().Trim();
        synonym = synonym.ToLower().Trim();

        lock (_addLock)
        {
            if (!_wordSynonyms.TryGetValue(word, out HashSet<string>? synonyms))
            {
                synonyms = new HashSet<string>();

                _wordSynonyms.TryAdd(word, synonyms);
            }

            synonyms.Add(synonym);

            if (!_wordSynonyms.TryGetValue(synonym, out HashSet<string>? words))
            {
                words = new HashSet<string>();

                _wordSynonyms.TryAdd(synonym, words);
            }

            words.Add(word);
        }

        return true;
    }

    public IEnumerable<string> GetSynonims(string word)
    {
        word = word.ToLower().Trim();

        var synonyms = new HashSet<string>();
        var queue = new Queue<string>();
        var visited = new HashSet<string>();

        // Enqueue the starting word
        queue.Enqueue(word);
        visited.Add(word);

        while (queue.Count > 0)
        {
            string currentWord = queue.Dequeue();

            if (_wordSynonyms.TryGetValue(currentWord, out HashSet<string>? wordSynonyms))
            {
                foreach (string wordSynonym in wordSynonyms)
                {
                    // If word is not checked, add add as synonym & queue for children checks.
                    if (visited.Add(wordSynonym))
                    {
                        synonyms.Add(wordSynonym);
                        queue.Enqueue(wordSynonym);
                    }
                }
            }
        }

        return synonyms;
    }

    public void Reset()
    {
        _wordSynonyms = new ConcurrentDictionary<string, HashSet<string>>();
    }
}

public interface ISynonymService
{
    public bool Add(string word, string synonym);
    IEnumerable<string> GetSynonims(string word);
    void Reset();
}