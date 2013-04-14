
var pathUtil = require('path')
var should = require('should')
var compress = require('../lib/compress')
var fileStream = require('quiver-file-stream')
var pipeStream = require('quiver-pipe-stream').pipeStream
var streamConvert = require('quiver-stream-convert')

var testReadFile = pathUtil.join(__dirname, '../lib/compress.js')
var testWriteFile = pathUtil.join(__dirname, 'test-compressed.gz')
var compareWriteFile = pathUtil.join(__dirname, 'compare-compressed.gz')

describe('compress manual test', function() {
  it('should save a compressed file', function(callback) {
    fileStream.createFileReadStream(testReadFile, function(err, readStream) {
      if(err) throw err

      fileStream.createFileWriteStream(testWriteFile, function(err, writeStream) {
        if(err) throw err

        compress.streamToGzipStream(readStream, function(err, transformedStream) {
          if(err) throw err

          pipeStream(transformedStream, writeStream, callback)
        })
      })
    })
  })

  it('should save a decompressed file', function(callback) {
    fileStream.createFileReadStream(testReadFile, function(err, originalStream) {
      if(err) throw err

      streamConvert.streamToText(originalStream, function(err, originalText) {
        if(err) throw err

        fileStream.createFileReadStream(compareWriteFile, function(err, compressedStream) {
          if(err) throw err

          compress.gzipStreamToStream(compressedStream, function(err, decompressedStream) {
            if(err) throw err

            streamConvert.streamToText(decompressedStream, function(err, decompressedText) {
              if(err) throw err

              decompressedText.should.equal(originalText)
              callback()
            })
          })
        })
      })
    })
  })
})