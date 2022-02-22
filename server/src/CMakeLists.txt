cmake_minimum_required (VERSION 3.10)

# define the project
project (the_401_war)

# check if in the source directory
if (${CMAKE_SOURCE_DIR} STREQUAL ${CMAKE_BINARY_DIR})
message (FATAL_ERROR "In-source builds not allowed! Create a build directory and run CMake from there.")
endif()

# set variables
set (CMAKE_BUILD_TYPE Debug)
set (CMAKE_CXX_COMPILER "clang++")
set (CMAKE_CXX_STANDARD_REQUIRED True)
set (CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g -O0")
set (CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -Os")
set (CMAKE_EXPORT_COMPILE_COMMANDS ON)
# set (CMAKE_CXX_CLANG_TIDY clang-tidy -checks="*,-google-build-using-namespace,-cppcoreguidelines-avoid-non-const-global-variables,-llvmlibc-implementation-in-namespace,-modernize-use-trailing-return-type,-readability-isolate-declaration,-llvmlibc-callee-namespace" --use-color)

# add include directories
include_directories (../include/)

# add link directories

# add executables
add_executable (main main.cpp)

# add link libraries
