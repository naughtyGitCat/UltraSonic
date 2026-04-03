using System.Threading.Channels;

namespace LrWallPaper.Services;

public class MasterReplicationService
{
    private readonly Channel<List<FileMD5Entity>> _channel;

    public MasterReplicationService()
    {
        _channel = Channel.CreateUnbounded<List<FileMD5Entity>>(new UnboundedChannelOptions
        {
            SingleReader = true,
            SingleWriter = false
        });
    }

    public void Enqueue(List<FileMD5Entity> payload)
    {
        _channel.Writer.TryWrite(payload);
    }

    public IAsyncEnumerable<List<FileMD5Entity>> ReadAllAsync(CancellationToken ct)
    {
        return _channel.Reader.ReadAllAsync(ct);
    }
}
