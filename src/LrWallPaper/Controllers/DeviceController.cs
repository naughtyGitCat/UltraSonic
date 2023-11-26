using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        public IEnumerable<object> GetCurrentDevice()
        {
            throw new NotImplementedException();
        }
    }
}
