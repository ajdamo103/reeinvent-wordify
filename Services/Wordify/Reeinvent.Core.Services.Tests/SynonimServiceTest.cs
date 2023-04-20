using FluentAssertions;
using Reeinvent.Wordify.Core.Services;
using Xunit;

namespace Reeinvent.Core.Services.Tests;

public class SynonimServiceTest
{
    private readonly SynonymInMemoryService _synonymInMemoryService;

    public SynonimServiceTest()
    {
        _synonymInMemoryService = new SynonymInMemoryService();

        _synonymInMemoryService.Add("wash", "clean");
        _synonymInMemoryService.Add("happy", "pleased");
        _synonymInMemoryService.Add("happy", "euphoric");
        _synonymInMemoryService.Add("euphoric", "happy");
        _synonymInMemoryService.Add("pleaSed", "Content");
    }

    [Fact]
    public void GetSynonims_Should_ReturnsCorrectResult_When_WordIsWash()
    {
        // Act
        var result = _synonymInMemoryService.GetSynonims("wash");

        // Assert
        result.Should().HaveCount(1);
        result.Should().Contain("clean");
    }

    [Fact]
    public void GetSynonims_Should_ReturnsCorrectResult_When_WordIsClean()
    {
        // Act
        var result = _synonymInMemoryService.GetSynonims("clean");

        // Assert
        result.Should().HaveCount(1);
        result.Should().Contain("wash");
    }

    [Fact]
    public void GetSynonims_Should_ReturnsCorrectResult_When_WordIsEuphoric()
    {
        // Act
        var result = _synonymInMemoryService.GetSynonims("euphoric");

        // Assert
        result.Should().HaveCount(3);
        result.Should().Contain("happy");
        result.Should().Contain("pleased");
        result.Should().Contain("content");
    }

    [Fact]
    public void GetSynonims_Should_ReturnsCorrectResult_When_WordIsContent()
    {
        // Act
        var result = _synonymInMemoryService.GetSynonims("contenT  ");

        // Assert
        result.Should().HaveCount(3);
        result.Should().Contain("happy");
        result.Should().Contain("pleased");
        result.Should().Contain("euphoric");
    }

    [Fact]
    public void GetSynonims_Should_ReturnsCorrectResult_When_WordIsHappy()
    {
        // Act
        var result = _synonymInMemoryService.GetSynonims("happy");

        // Assert
        result.Should().HaveCount(3);
        result.Should().Contain("content");
        result.Should().Contain("pleased");
        result.Should().Contain("euphoric");
    }
}
