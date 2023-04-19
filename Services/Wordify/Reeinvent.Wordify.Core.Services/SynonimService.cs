namespace Reeinvent.Wordify.Core.Services;

internal class SynonymInMemoryService : ISynonymService
{
    private Dictionary<string, HashSet<string>> _wordSynonyms;
    private Dictionary<string, HashSet<string>> _synonymWords;

    public SynonymInMemoryService()
    {
        _wordSynonyms = new Dictionary<string, HashSet<string>>();
        _synonymWords = new Dictionary<string, HashSet<string>>();
    }

    public void Add(string word, string synonym)
    {
        word = word.ToLower();
        synonym = synonym.ToLower();

        if (!_wordSynonyms.TryGetValue(word, out HashSet<string>? synonyms))
        {
            synonyms = new HashSet<string>();
            _wordSynonyms.Add(word, synonyms);
        }

        synonyms.Add(synonym);

        if (!_synonymWords.TryGetValue(synonym, out HashSet<string>? words))
        {
            words = new HashSet<string>();
            _synonymWords.Add(synonym, words);
        }

        words.Add(word);
    }

    public IEnumerable<string> GetSynonims(string word)
    {
        word = word.ToLower();

        var synonyms = new HashSet<string>();
        var queue = new Queue<string>();
        var visited = new HashSet<string>();

        // Enqueue the starting word
        queue.Enqueue(word);
        visited.Add(word);

        while (queue.Count > 0)
        {
            string currentWord = queue.Dequeue();

            // Check if the current word has any synonyms in the wordSynonyms dictionary
            if (_wordSynonyms.TryGetValue(currentWord, out HashSet<string>? wordSynonyms))
            {
                // Add the synonyms to the result set and enqueue them for further processing
                foreach (string wordSynonym in wordSynonyms)
                {
                    if (visited.Add(wordSynonym))
                    {
                        synonyms.Add(wordSynonym);
                        queue.Enqueue(wordSynonym);
                    }
                }
            }

            // Check if the current word is a synonym for any words in the synonymWords dictionary
            if (_synonymWords.TryGetValue(currentWord, out HashSet<string>? synonymWords))
            {
                // Add the original words for each synonym found and enqueue them for further processing
                foreach (string synonymWord in synonymWords)
                {
                    if (visited.Add(synonymWord))
                    {
                        synonyms.Add(synonymWord);
                        queue.Enqueue(synonymWord);
                    }
                }
            }
        }

        return synonyms;
    }

    public void Reset()
    {
        _wordSynonyms = new Dictionary<string, HashSet<string>>();
        _synonymWords = new Dictionary<string, HashSet<string>>();
    }
}

public interface ISynonymService
{
    public void Add(string word, string synonym);
    IEnumerable<string> GetSynonims(string word);
    void Reset();
}