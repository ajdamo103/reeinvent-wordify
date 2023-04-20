using Microsoft.AspNetCore.Mvc;
using Reeinvent.Common.Contracts;
using Reeinvent.Wordify.Core.Services;
using System.Net;

namespace Reeinvent.Wordify.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SynonymsController : ControllerBase
{
    private readonly ISynonymService _synonimService;

    public SynonymsController(ISynonymService synonimService)
    {
        _synonimService = synonimService;
    }

    // POST api/synonyms
    [HttpPost]
    public ActionResult CreateSynonym([FromBody] AddSynonymDto addSynonymDto)
    {
        bool success = _synonimService.Add(addSynonymDto.Word, addSynonymDto.Synonym);

        if (!success)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError);
        }

        return Ok();
    }

    // GET api/synonyms
    [HttpGet]
    public ActionResult GetSynonims([FromQuery] string word)
    {
        var synonyms = _synonimService.GetSynonims(word).ToList();

        return Ok(synonyms);
    }

    // POST api/synonyms/reset
    [HttpPost("reset")]
    public ActionResult Reset()
    {
        _synonimService.Reset();

        return Ok();
    }
}