export class Usuarios {

  static $inject = ['$http', '$rootScope', 'nsjRouting', '$window'];

  protected entities: any = [];
  
  constructor(protected $http: angular.IHttpService,
      protected $rootScope: angular.IRootScopeService,
      protected nsjRouting: any,
      protected $window: any) {
  
  }

  public load() {

      this.getProfile().then((response: any) => {
          this.entities.push(response.data);
          this.$rootScope.$broadcast('getProfile', this.entities[0]);
      });

      return this.entities;
  }

  public getProfile() {
      return this.$http({
          method: 'GET',
          url: this.nsjRouting.generate('profile', true)
      });
  }



}