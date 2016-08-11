sources := $(wildcard *.screeps)

CC := closure-compiler
FLAGS := --formatting PRETTY_PRINT --language_in=ECMASCRIPT5_STRICT

%.js : %.screeps
	jshint $<
	$(CC) $(FLAGS) --js $< --js_output_file $@

all: $(addsuffix .js, $(basename $(wildcard *.screeps)))

.PHONY : all
