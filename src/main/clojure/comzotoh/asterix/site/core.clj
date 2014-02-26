;;
;; Copyright (c) 2013 Cherimoia, LLC. All rights reserved.
;;
;; This library is distributed in the hope that it will be useful
;; but without any warranty; without even the implied warranty of
;; merchantability or fitness for a particular purpose.
;;
;; The use and distribution terms for this software are covered by the
;; Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
;; which can be found in the file epl-v10.html at the root of this distribution.
;;
;; By using this software in any fashion, you are agreeing to be bound by
;; the terms of this license.
;; You must not remove this notice, or any other, from this software.
;;

(ns  ^{ :doc ""
        :author "kenl" }

  comzotoh.asterix.site.core )

(import '( com.zotoh.wflow
  FlowPoint Activity Pipeline PipelineDelegate PTask Work))
(import '(com.zotoh.gallifrey.io HTTPEvent HTTPResult))
(import '(com.zotoh.wflow.core Job))
(import '(java.util HashMap Map))

(use '[clojure.tools.logging :only (info warn error debug)])
(use '[comzotohcljc.tardis.core.constants])
(use '[comzotohcljc.tardis.core.wfs])


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(deftype MyAppMain []
  comzotohcljc.tardis.impl.ext.CljAppMain
  (contextualize [_ container]
    (info "My AppMain contextualized by container " container))
  (configure [_ options]
    (info "My AppMain configured with options " options))
  (initialize [_]
    (info "My AppMain initialized!"))
  (start [_]
    (info "My AppMain started"))
  (stop [_]
    (info "My AppMain stopped"))
  (dispose [_]
    (info "My AppMain finz'ed"))
)


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn- doShowLandingPage "" ^PTask []
  (DefWFTask
    (perform [_ fw job arg]
      (let [ ^HTTPEvent evt (.event job)
             ^HTTPResult res (.getResultObj evt)
             ^com.zotoh.gallifrey.io.Emitter src (.emitter evt)
             ^comzotohcljc.tardis.impl.ext.ContainerAPI co (.container src)
             ^String tpl (:template (.getv job EV_OPTS))
             [rdata ct] (.loadTemplate co tpl (HashMap.)) ]
        (.setStatus res 200)
        (.setContent res rdata)
        (.setHeader res "content-type" ct)
        (.replyResult evt)))))

(deftype LandingHandler [] PipelineDelegate

  (getStartActivity [_  pipe]
    (require 'comzotoh.asterix.site.core)
    (doShowLandingPage))

  (onStop [_ pipe]
    (info "nothing to be done here, just stop please."))

  (onError [ _ err curPt]
    (info "Oops, I got an error!")))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


(def ^:private core-eof nil)

