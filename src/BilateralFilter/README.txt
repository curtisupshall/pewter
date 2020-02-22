 Table of content
##################

1- How to install
2- How to use
3- The algorithm
4- The code
5- Improving performances





 1- How to install
###################

a) Requirements
---------------

This code has been made and tested under Linux. The following
library needs to be installed:
FFTW:    http://www.fftw.org/download.html


b) Compiling
------------

Running 'make' should compile everything out of the box. If there are
problems with FFTW, you might need to provide the path to its header 
files and libraries. This is done by editing these two files: 'Makefile'
and 'fft_3D/Makefile'.









 2- How to use
###############

On the command line, type:
./bilateral_filter input.ppm output.ppm 16.0 0.1 8.0 0.05

The parameters are:

- 'input.ppm': It is an image file in the PPM format. 'convert' from
the ImageMagick package makes it easy to produce such files.

- 'output.ppm': It is the image that will be created. The file format
is PPM. Software such as Photoshop, Gimp, and xv can read this format.

- 16.0: The 1st number is the space sigma in pixels.

- 0.1: The 2nd number is the range sigma. The gray levels are considered
in the [0:1] range.

- 8.0: The 3rd number is the space sampling step in pixels.

- 0.05: The 4th number is the range sampling step.









 3- The algorithm
##################

Here is the pseudo-code for the algorithm:
(a) load a PPM image
(b) compute gray levels
(c) apply the fast bilateral filter
(d) save the result image

Comments
--------

(b) We use the simple formula: I = (20R + 40G + B) / 61;

(c) The details are in our paper.










 4- The code
#############

The code is in C++.

The algorithm described above is in 'bilateral_filter.cc'. This 
is the file that you may want to edit. The code follows the 
description exactly. Comments precede each part. Variable names 
are long and self-explanatory.

You should not need to edit the other files. But in case you want to,
here is a short description of each of them.


In the 'include' directory:
---------------------------

- array.h: Classes 2D and 3D arrays of values.

- fft_3D.h: Includes the files need for 3D Fourier transforms.

- linear_bf.h: Provides a fast bilateral filter based on 3D FFT.

- math_tools.h: Several useful simple functions.

- msg_stream.h: C++ streams for warnings and errors.


In the 'fft_3D' directory:
--------------------------

- convolution_3D.h: Provides convolution between 3D functions.

- fill_3D.h: Fills 3D arrays with function values.

- support_3D.cc, support_3D.h: Provides the basic support for 3D
  Fourier transforms




5- Improving performances
#########################

Compiler optimizations can speed up the process a lot. However, the
provided makefile does not use any optimization to maximize the
chances of successful compilation. For instance, with 'gcc' you may
try options such as '-O3' and '-march=pentium4'.



FFTW can also run faster if you use the "wisdom" system. For that, you
need to comment the line:

FFT::Support_3D::set_fftw_flags(FFTW_ESTIMATE);

and to define an environment variable FFTW_WISDOM with the name of the
file that will store FFTW data. These data are machine-dependent
i.e. you cannot share them between different machines. Under Linux
with 'tcsh', you can use this:

setenv FFTW_WISDOM ${HOME}/wisdom.${HOST}.fftw

Then, the first run on a given image size will be slow (up to one hour
on pictures with several megapixels) but the next ones will be faster.



Finally, as mentioned in the article, the convolution can be more
efficiently evaluated. This involves larger modifications that are
beyond the scope of this demo.
