# Custom plugin from https://github.com/jhshi/octopress-page-view

require 'jekyll'
require 'jekyll/post'
require 'rubygems'
require 'google/api_client'
require 'chronic'

module Jekyll

  class GoogleAnalytics < Generator
    safe :true
    priority :high

    def generate(site)
      if !site.config['page-view']
        return
      end

      pv = site.config['page-view']
      client = Google::APIClient.new(
        :application_name => 'octopress-page-view',
        :application_version => '1.0',
      )

      # Load our credentials for the service account
      key = Google::APIClient::KeyUtils.load_from_pkcs12(pv['key_file'], pv['key_secret'])
      client.authorization = Signet::OAuth2::Client.new(
        :token_credential_uri => 'https://accounts.google.com/o/oauth2/token',
        :audience => 'https://accounts.google.com/o/oauth2/token',
        :scope => 'https://www.googleapis.com/auth/analytics.readonly',
        :issuer => pv['service_account_email'],
        :signing_key => key)

      # Request a token for our service account
      client.authorization.fetch_access_token!
      analytics = client.discovered_api('analytics','v3')

      params = {
        'ids' => pv['profileID'],
        'start-date' => Chronic.parse(pv['start']).strftime("%Y-%m-%d"),
        'end-date' => Chronic.parse(pv['end']).strftime("%Y-%m-%d"),
        'dimensions' => "ga:pagePath",
        'metrics' => pv['metric'],
        'max-results' => 100000,
      }
      if pv['segment']
        params['segment'] = pv['segment']
      end
      if pv['filters']
        params['filters'] = pv['filters']
      end

      response = client.execute(:api_method => analytics.data.ga.get, :parameters => params)
      results = Hash[response.data.rows]

      tot = 0
      # display per post page view
      site.posts.each { |post|
        url = (site.config['baseurl'] || '') + post.url
        hits = (results[url])? results[url].to_i : 0
        hits += (results[url + 'index.html'])? results[url + 'index.html'].to_i : 0
        post.data.merge!("_pv" => hits)
        tot += hits
      }

      # calculate total page view
      site.pages.each { |page|
        url = (site.config['baseurl'] || '') + page.url
        path = (site.config['baseurl'] || '') + page.url.sub('index.html', '')
        hits = (results[url])? results[url].to_i : 0
        hits += (results[path])? results[path].to_i : 0
        page.data.merge!("_pv" => hits)
        tot += hits
      }

      # display total page view in page
      site.pages.each { |page|
        page.data.merge!("_tpv" => tot)
      }
    end
  end

  class PageViewTag < Liquid::Tag

    def initialize(name, marker, token)
      @params = Hash[*marker.split(/(?:: *)|(?:, *)/)]
      super
    end

    def render(context)
      site = context.environments.first['site']
      if !site['page-view']
        return ''
      end

      post = context.environments.first['post']
      if post == nil
        post = context.environments.first['page']
        if post == nil
          return ''
        end
      end

      pv = post['_pv']
      if pv == nil
        return ''
      end

      html = pv.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse + ' views'
      return html
    end #render
  end # PageViewTag

  class TotalPageViewTag < Liquid::Tag

    def initialize(name, marker, token)
      @params = Hash[*marker.split(/(?:: *)|(?:, *)/)]
      super
    end

    def render(context)
      site = context.environments.first['site']
      if !site['page-view']
        return ''
      end

      post = context.environments.first['post']
      if post == nil
        post = context.environments.first['page']
        if post == nil
          return ''
        end
      end

      pv = post['_tpv']
      if pv == nil
        return ''
      end

      html = pv.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse + ' views'
      return html
    end #render
  end # TotalPageViewTag
end

Liquid::Template.register_tag('pageview', Jekyll::PageViewTag)
Liquid::Template.register_tag('totalpageview', Jekyll::TotalPageViewTag)
