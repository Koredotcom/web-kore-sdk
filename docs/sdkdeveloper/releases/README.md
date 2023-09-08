
# Web SDK Checklist

## For V1
1.Update release history in README.md in master<br/> 
2.Create a version branch web-sdk-X.X.X from master
## For V2

1.Update change log CHANGELOG.md in v2/dev <br/>
2.Update version no in following references in v2/dev:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;package.json<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;umd cdn url with tag number <br/>
3.Create a version branch v2/X.X.X from v2/dev<br/>
4.Create a tag v2-X.X.X<br/>
5.Create release in github<br/>
&nbsp;&nbsp;&nbsp;&nbsp;5.1.Select tag v2-X.X.X(previously created) and branch v2/X.X.X<br/>
&nbsp;&nbsp;&nbsp;&nbsp;5.2.Update the release notes<br/>
6.Run npm run-script npm-publish-prod -- --version=X.X.X
         

