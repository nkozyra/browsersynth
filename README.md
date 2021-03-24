# browsersynth
A tutorial for making synths in your browser!

![simple synth](https://github.com/nkozyra/browsersynth/blob/main/assets/01_simplesynth.png?raw=true)


## Running a synthesizer
To get a synth up and running in your browser, you'll need to run a webserver, as certain required permissions cannot be invoked via file:// in the browser.

Use whatever you like to do this, but Python's Simple HTTP Server is a super quick way to get rolling.

With Python 2.x:
```python -m SimpleHTTPServer```

With Python 3.x:
```python3 -m http.server```

By default this starts a simple file server on port 8080. To use a different port append it to the end of the preceeeding command, as in: `python -m SimpleHTTPServer 8081`

Then, just visit `http://localhost:8080/` and start playing.

