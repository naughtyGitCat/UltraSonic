using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xunit;
using Xunit.Abstractions;

namespace LrWallPaper.Tests
{
    public class TestDateTimeParse
    {
        public ITestOutputHelper _testOutputHelper;
        public TestDateTimeParse(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }
        [Fact]
        public void TestParse1()
        {
            DateTime dt1 = DateTime.ParseExact("2022:05:04 17:09:40", "yyyy:MM:dd HH:mm:ss",System.Globalization.CultureInfo.InvariantCulture);
            _testOutputHelper.WriteLine("2022:05:04 17:09:40");
            _testOutputHelper.WriteLine(dt1.ToString());
            Assert.Equal(2022, dt1.Year);
            Assert.Equal(5, dt1.Month);
            Assert.Equal(4, dt1.Day);
            Assert.Equal(17, dt1.Hour);
            Assert.Equal(09, dt1.Minute);
            Assert.Equal(40, dt1.Second);
            
        }
    }
}
