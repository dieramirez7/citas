using API.data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{

    private readonly DataContext _context;
    public UsersController(DataContext context)
    {
        _context = context;
    }
    [HttpGet]

    public ActionResult<IEnumerable<AppUser>> GetUsers()
    {
        var users = _context.Users.ToList();
        return users;
    }
}