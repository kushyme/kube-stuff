{
  description = "Development Environment Flake";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    in {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          git
          jq
          nodejs_24
          docker-client
          awscli2
          aws-cdk-cli
          kubectl
          kubernetes-helm
          kind
          k9s
          kubectx
          pnpm
          ripgrep
        ];
      };
    });
}
