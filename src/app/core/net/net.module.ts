import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTOR } from '@app/core/net/interceptors';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [HTTP_INTERCEPTOR]
})
export class NetModule {
  constructor(@Optional() @SkipSelf() parentModule: NetModule) {
    if (parentModule) {
      throw new Error(`NetModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
