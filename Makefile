.PHONY: all clean package

all: package

package:
	name=cf-pop-$$(jshon -e version -u < manifest.json).zip && \
	7z a -tzip $$name '-xr!*~' -'xr!.*' '-xr!*.zip' '-xr!Makefile' '-xr!LICENSE' '-xr!misc' . && \
	7z l $$name

clean:
	-rm *.zip
