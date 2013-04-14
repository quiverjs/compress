
var zlib = require('zlib')
var streamConvert = require('quiver-stream-convert')

var gzipTransformer = streamConvert.createStreamTransformer('Gzip', zlib.gzip)
var gunzipTransformer = streamConvert.createStreamTransformer('Gunzip', zlib.gunzip)
var deflateTransformer = streamConvert.createStreamTransformer('Deflate', zlib.deflate)
var inflateTransformer = streamConvert.createStreamTransformer('Inflate', zlib.inflate)

module.exports = {
  streamToGzipStream: gzipTransformer.streamToGzipStream,
  streamableToGzipStream: gzipTransformer.streamableToGzipStream,
  gzipStreamToStream: gunzipTransformer.streamToGunzipStream,

  streamToDeflateStream: deflateTransformer.streamToDeflateStream,
  streamableToDeflateStream: deflateTransformer.streamableToDeflateStream,
  deflateStreamToStream: inflateTransformer.streamToInflateStream
}