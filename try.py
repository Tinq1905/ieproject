from hashlib import sha1
import hmac
import binascii
def getUrl(request):
    devId = 3000212
    key = 'a256f6be-b7b2-4a37-8368-cb36f558c48a'
    request = request + ('&' if ('?' in request) else '?')
    raw = request+'devid={0}'.format(devId)
    hashed = hmac.new(key, raw, sha1)
    signature = hashed.hexdigest()
    return 'http://timetableapi.ptv.vic.gov.au'+raw+'&signature={1}'.format(devId, signature)
print getUrl('/v3/stops/location/-37.877010,145.044267')
